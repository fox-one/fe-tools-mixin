import {
  HttpMethod,
  ProviderInterface,
  User,
  VerifyPinPayload,
  GetPinLogsParams
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    getPinLogs(params: GetPinLogsParams) {
      return provider.send("/logs", HttpMethod.GET, "", params);
    },

    updatePin(oldPin: string, newPin: string): Promise<User> {
      return provider.send("/pin/update", HttpMethod.POST, {
        old_pin: oldPin,
        pin: newPin
      });
    },

    verifyPin(body: VerifyPinPayload) {
      return provider.send("/pin/verify", HttpMethod.POST, body);
    }
  };
}
