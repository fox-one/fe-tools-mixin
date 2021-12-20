import {
  HttpMethod,
  ProviderInterface,
  Transaction,
  NetworkChain,
  NetworkAsset,
  NetworkTopAsset,
  NetworkSnapshot,
  NetworkTicker,
  NetworkSnapshotsParams,
  NetworkTickerParams,
  ExternalTransactionParams
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    getExternalTransactions(
      opts: ExternalTransactionParams
    ): Promise<Transaction[]> {
      return provider.send("/external/transactions", HttpMethod.GET, "", opts);
    },

    getNetworkAsset(id: string): Promise<NetworkAsset> {
      return provider.send(`/network/assets/${id}`, HttpMethod.GET);
    },

    getNetworkChains(): Promise<NetworkChain[]> {
      return provider.send("/network/chains", HttpMethod.GET);
    },

    getNetworkSnapshot(id: string): Promise<NetworkSnapshot> {
      return provider.send(`/network/snapshots/${id}`, HttpMethod.GET);
    },

    getNetworkSnapshots(
      params: NetworkSnapshotsParams
    ): Promise<NetworkSnapshot[]> {
      return provider.send("/network/snapshots", HttpMethod.GET, "", params);
    },

    getNetworkTicker(params: NetworkTickerParams): Promise<NetworkTicker> {
      return provider.send("/network/ticker", HttpMethod.GET, params);
    },

    getNetworkTopAssets(): Promise<NetworkTopAsset[]> {
      return provider.send("/network/assets/top", HttpMethod.GET);
    },

    // Get one-time user keys.
    outputs(body) {
      return provider.send("/outputs", HttpMethod.POST, body);
    },

    searchNetworkAsset(str: string): Promise<NetworkTopAsset[]> {
      return provider.send(`/network/assets/search/${str}`, HttpMethod.GET);
    },

    ticker(opts: NetworkTickerParams): Promise<NetworkTicker> {
      return provider.send("/ticker", HttpMethod.GET, "", opts);
    }
  };
}
