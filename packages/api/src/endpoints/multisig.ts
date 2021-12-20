import {
  HttpMethod,
  ProviderInterface,
  MultisigRequest,
  MultisigsRequestPayload,
  MultisigsOutputsParams,
  MultisigUTXO
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    createMultisigs(body: MultisigsRequestPayload): Promise<MultisigRequest> {
      return provider.send("/multisigs/requests", HttpMethod.POST, body);
    },

    getMultisigsOutputs(params: MultisigsOutputsParams): Promise<MultisigUTXO> {
      return provider.send("/multisigs/outputs", HttpMethod.GET, "", params);
    },

    multisigsAction(
      id: string,
      action: string,
      pin: string
    ): Promise<MultisigRequest> {
      return provider.send(
        `/multisigs/requests/${id}/${action}`,
        HttpMethod.POST,
        { action, pin }
      );
    }
  };
}
