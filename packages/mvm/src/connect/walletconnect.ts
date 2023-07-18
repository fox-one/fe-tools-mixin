import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { MVMChain } from "../constants";

export default async function (projectId: string) {
  //  Create WalletConnect Provider
  const provider = await EthereumProvider.init({
    chains: [1, Number(MVMChain.chainId)],
    projectId,
    showQrModal: true
  });

  //  Enable session (triggers QR Code modal)
  await provider.enable();

  return provider;
}
