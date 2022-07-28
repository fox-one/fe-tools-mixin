import WalletConnectProvider from "@walletconnect/web3-provider";

export default async function (infuraId: string) {
  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId
  });

  //  Enable session (triggers QR Code modal)
  await provider.enable();

  return provider;
}
