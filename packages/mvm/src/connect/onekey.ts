export default async function () {
  const provider = (window as any).$onekey.ethereum;

  if (!provider) {
    return "OneKey is not installed";
  }

  await provider.request({ method: "eth_requestAccounts" });

  return provider;
}
