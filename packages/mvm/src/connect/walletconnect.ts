import WalletConnectProvider from "@walletconnect/web3-provider";
import { MVMChain } from "../constants";

export default async function (infuraId: string) {
  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId,
    qrcodeModalOptions: {
      desktopLinks: ["metamask", "imToken", "TokenPocket"],
      mobileLinks: ["metamask", "imToken", "TokenPocket"]
    },
    rpc: {
      [Number(MVMChain.chainId)]: MVMChain.rpcUrls[0]
    }
  });

  //  Enable session (triggers QR Code modal)
  await provider.enable();

  return provider;
}
