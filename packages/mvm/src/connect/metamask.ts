import detectEthereumProvider from "@metamask/detect-provider";

export default async function () {
  const provider: any = await detectEthereumProvider({ mustBeMetaMask: true });

  await provider.request({ method: "eth_requestAccounts" });

  return provider;
}
