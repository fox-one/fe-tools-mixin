import WalletConnectProvider from "@walletconnect/web3-provider";

export default async function () {
  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1"
  });

  //  Enable session (triggers QR Code modal)
  await provider.enable();

  return provider;
}
