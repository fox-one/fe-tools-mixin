import {
  HttpMethod,
  ProviderInterface,
  CollectibleRequestPayload,
  CollectibleAction,
  GetCollectibleOutputsParams,
  CollectibleToken
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    getCollectibleOutputs(params: GetCollectibleOutputsParams) {
      return provider.send("/collectibles/outputs", HttpMethod.GET, "", params);
    },

    getCollectibleToken(id: string): Promise<CollectibleToken> {
      return provider.send(`/collectibles/tokens/${id}`, HttpMethod.GET);
    },

    sendCollectibleAction(id: string, action: CollectibleAction, pin: string) {
      return provider.send(
        `/collectibles/requests/${id}/${action}`,
        HttpMethod.POST,
        { pin }
      );
    },

    sendCollectibleRequest(body: CollectibleRequestPayload) {
      return provider.send("/collectibles/requests", HttpMethod.POST, body);
    }
  };
}
