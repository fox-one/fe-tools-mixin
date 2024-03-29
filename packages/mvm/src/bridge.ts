import type { ProxyUser, WithdrawAction, Token } from "./types";
import axios from "axios";

export async function getProxyUser(address: string): Promise<ProxyUser> {
  const resp = await axios.post("https://bridge.mvm.dev/users", {
    public_key: address
  });

  return resp.data.user;
}

export async function getProxyUserContract(address) {
  const user = await getProxyUser(address);

  return user?.contract ?? "";
}

export async function getExtra(payload: WithdrawAction) {
  const resp = await axios.post("https://bridge.mvm.dev/extra", payload);
  const extra = resp.data.extra;

  return "0x" + extra;
}

export async function getTokenList(address: string): Promise<Token[]> {
  const resp = await axios.get("https://scan.mvm.dev/api", {
    params: { action: "tokenlist", address, module: "account" }
  });

  return resp.data.result;
}

export default { getExtra, getProxyUser, getProxyUserContract, getTokenList };
