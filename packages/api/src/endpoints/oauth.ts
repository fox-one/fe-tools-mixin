import {
  GetAccessTokenPayload,
  GetAccessTokenResp,
  HttpMethod,
  ProviderInterface
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    getAccessToken(body: GetAccessTokenPayload): Promise<GetAccessTokenResp> {
      return provider.send("/oauth/token", HttpMethod.POST, body);
    }
  };
}
