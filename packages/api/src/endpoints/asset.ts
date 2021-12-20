import {
  HttpMethod,
  ProviderInterface,
  Asset,
  Fee,
  ExchangeRate
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    getAsset(id: string): Promise<Asset> {
      return provider.send(`/assets/${id}`, HttpMethod.GET);
    },

    getAssets(): Promise<Asset[]> {
      return provider.send("/assets", HttpMethod.GET);
    },

    getExchangeRates(): Promise<ExchangeRate[]> {
      return provider.send("/fiats", HttpMethod.GET);
    },

    getExernalExchangeRates(): Promise<ExchangeRate[]> {
      return provider.send("/external/fiats", HttpMethod.GET);
    },

    getFee(id: string): Promise<Fee> {
      return provider.send(`/assets/${id}/fee`, HttpMethod.GET);
    }
  };
}
