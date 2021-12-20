import {
  HttpMethod,
  ProviderInterface,
  Withdrawal,
  Address,
  CreateAddressPayload,
  DeleteAddressPayload,
  WithdrawPayload
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    createWithdrawAddress(body: CreateAddressPayload): Promise<Withdrawal> {
      return provider.send("/addresses", HttpMethod.POST, body);
    },

    deleteWithdrawAddress(id: string, body: DeleteAddressPayload) {
      return provider.send(`/addresses/${id}/delete`, HttpMethod.POST, body);
    },

    getAssetWithdrawAddresses(id: string): Promise<Address[]> {
      return provider.send(`/assets/${id}/addresses`, HttpMethod.GET);
    },

    getWithdrawAddress(id: string): Promise<Address> {
      return provider.send(`/addresses/${id}`, HttpMethod.GET);
    },

    withdraw(opts: WithdrawPayload): Promise<Withdrawal> {
      return provider.send("/withdrawals", HttpMethod.POST, opts);
    }
  };
}
