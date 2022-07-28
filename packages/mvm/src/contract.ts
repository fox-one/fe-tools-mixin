import { ethers, utils } from "ethers";
import { parse, stringify } from "uuid";
import { RegistryAddress, BridgeAddress, RpcProvider } from "./constants";
import { AssetABI, RegistryABI, BridgeABI } from "./abis";

export default class ContractOpt {
  signer: ethers.providers.JsonRpcSigner;

  contractEntries: { asset_id: string; contract_address: string }[] = [];

  constructor(provider) {
    this.signer = provider.getSigner();
  }

  registryContract = new ethers.Contract(
    RegistryAddress,
    RegistryABI,
    new ethers.providers.JsonRpcProvider(RpcProvider)
  );

  async getContractAddressByAssetId(assetId: string): Promise<string> {
    const record = this.contractEntries.find(
      ({ asset_id }) => asset_id === assetId
    );

    if (record) return record.contract_address;

    const address = await this.registryContract.contracts(
      "0x" + Buffer.from(String(parse(assetId))).toString("hex")
    );

    this.contractEntries.push({ asset_id: assetId, contract_address: address });

    return address;
  }

  async getAssetIdByContractAddress(address: string): Promise<string> {
    const record = this.contractEntries.find(
      ({ contract_address }) => contract_address === address
    );

    if (record) return record.asset_id;

    const resp = await this.registryContract.assets(address);
    const assetId = stringify(utils.arrayify(resp));

    this.contractEntries.push({ asset_id: assetId, contract_address: address });

    return assetId;
  }

  async execAssetContract(assetId: string, method: string, args: string[]) {
    const address = await this.getContractAddressByAssetId(assetId);
    const contract = new ethers.Contract(address, AssetABI, this.signer);

    return contract[method](...args);
  }

  execBridgeContract(method: string, args: string[]) {
    const contract = new ethers.Contract(BridgeAddress, BridgeABI);

    return contract[method](...args);
  }
}
