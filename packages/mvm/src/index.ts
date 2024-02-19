import type { ProxyUser, WithdrawPayload, MVMConfig } from "./types";

import { providers, utils } from "ethers";
import MixinAPI from "@foxone/mixin-api";
import { MVMChain, NativeAssetId } from "./constants";
import { signAuthenticationToken } from "@foxone/mixin-api/encrypt";
import {
  fmtWithdrawAmount,
  fmtBalance,
  wrapPromiseWithTimeout
} from "./helper";
import ContractOpt from "./contract";
import Cache from "./cache";
import bridge from "./bridge";
import connect from "./connect";
import EventEmitter from "events";
import { SiweMessage } from "siwe";

export default class MVM extends EventEmitter {
  public user: ProxyUser | null = null;

  public contractOpt: ContractOpt | null = null;

  public library: providers.Web3Provider | null = null;

  public provider: any = null;

  public account = "";

  public connected = false;

  public api = new MixinAPI();

  public config: MVMConfig;

  public cache: Cache;

  constructor(config: MVMConfig) {
    super();
    this.config = config;
    this.cache = new Cache(this.api);
  }

  public async connect(type: "metamask" | "walletconnect" | "onekey") {
    const provider = await connect(type, this.config);
    const library = new providers.Web3Provider(provider, "any");
    const accounts = await library.listAccounts();
    const network = await library.getNetwork();

    const chainId = this.config.chainId || MVMChain.chainId;

    if (network.chainId !== Number(chainId)) {
      try {
        await wrapPromiseWithTimeout(
          library.provider.request?.({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }]
          })
        );
      } catch (error: any) {
        if (
          (error.code === 4902 ||
            error?.message?.includes("Unrecognized chain ID")) &&
          chainId === MVMChain.chainId
        ) {
          await wrapPromiseWithTimeout(
            library.provider?.request?.({
              method: "wallet_addEthereumChain",
              params: [MVMChain]
            })
          );
        }
      }
    }

    const account = accounts[0];

    const address = utils.getAddress(account);
    const user = await bridge.getProxyUser(address);

    this.library = library;
    this.provider = provider;
    this.account = address;
    this.user = user;
    this.contractOpt = new ContractOpt(library);
    this.connected = true;
    this.api.config(user.key);
  }

  public disconnect() {
    this.emit("disconnect");
    this.clear();
  }

  clear() {
    this.library = null;
    this.provider = null;
    this.account = "";
    this.contractOpt = null;
    this.user = null;
    this.connected = false;
  }

  public getNetwork() {
    return this.library?.getNetwork();
  }

  public async watchAsset(params) {
    const address = await this.contractOpt?.getContractAddressByAssetId(
      params.assetId
    );

    await this.library?.provider.request?.({
      method: "wallet_watchAsset",
      params: {
        options: {
          address,
          decimals: 8,
          image: params.image,
          symbol: params.symbol
        },
        type: "ERC20"
      } as any
    });
  }

  public async withdraw(payload: WithdrawPayload) {
    const network = await this.getNetwork();

    if (network?.chainId !== Number(MVMChain.chainId)) {
      throw new Error("Current chain is not Mixin Virtual Machine");
    }

    const { action, amount, asset_id } = payload;
    const isNative = asset_id === NativeAssetId;
    const extra = await bridge.getExtra(action);
    const to = await bridge.getProxyUserContract(this.account);
    const value = fmtWithdrawAmount(String(amount), isNative);

    const gasPrice = await this.library?.getGasPrice();
    const balance = await this.library?.getBalance(this.account);

    if (!balance || balance?.lte(0)) {
      throw new Error("Insufficient Balance for Gas Fee");
    }

    if (isNative) {
      await this.contractOpt?.execBridgeContract(
        "release",
        [to, extra],
        value,
        gasPrice?.toNumber() ?? 50000000
      );
    } else {
      await this.contractOpt?.execAssetContract(
        asset_id,
        "transferWithExtra",
        [to, value, extra],
        gasPrice?.toNumber() ?? 50000000 // 0.05 GWei
      );
    }
  }

  public async getAsset(assetId: string) {
    const isNative = assetId === NativeAssetId;

    const resp = isNative
      ? ((await this.library?.getBalance(this.account)) ?? "0").toString()
      : await this.contractOpt?.execAssetContract(
          assetId,
          "balanceOf",
          [this.account],
          0
        );
    const balance = fmtBalance(resp, isNative);
    const asset = await this.cache.getAsset(assetId);

    return { ...asset, balance };
  }

  public async getAssets() {
    const tokens = (await bridge.getTokenList(this.account)) || [];
    const assets = await Promise.all(
      tokens?.map(async (token) => {
        const asset = await this.cache.getAsset(token.mixinAssetId);
        const balance = fmtBalance(token.balance);

        return { ...asset, balance };
      })
    );
    const nativeAsset = await this.getAsset(NativeAssetId);

    return [nativeAsset, ...(assets || [])].filter((x) => !!x);
  }

  public async signMessage(params: Partial<SiweMessage>) {
    const domain = window.location.host;
    const origin = window.location.origin;

    const message = new SiweMessage({
      address: this.account,
      chainId: 1,
      domain,
      uri: origin,
      version: "1",
      ...params
    });
    const text = message.prepareMessage();
    const signer = this.library?.getSigner();
    const signature = await signer?.signMessage(text);

    return { message: text, signature };
  }

  public getAuthToken() {
    return this.signToken({ data: "", method: "GET", url: "/me" });
  }

  private signToken({ data, method, url }) {
    if (!this.user) {
      throw new Error("No proxy user found");
    }

    return signAuthenticationToken(
      this.user.key.client_id,
      this.user.key.session_id,
      this.user.key.private_key,
      method,
      url,
      data
    );
  }
}
