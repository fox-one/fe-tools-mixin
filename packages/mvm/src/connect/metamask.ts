import detectEthereumProvider from "@metamask/detect-provider";

export default async function () {
  const provider: any = await detectEthereumProvider();

  await provider.request({ method: "eth_requestAccounts" });

  return provider;
}
