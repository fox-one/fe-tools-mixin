import {
  HttpMethod,
  ProviderInterface,
  CreateTransferPayload,
  Transfer,
  RawTransactionRequest,
  Snapshot,
  SnapshotQueryParams,
  RawTransactionPayment
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    getSnapshot(id: string): Promise<Snapshot> {
      return provider.send(`/snapshots/${id}`, HttpMethod.GET);
    },

    getSnapshots(params: SnapshotQueryParams): Promise<Snapshot[]> {
      return provider.send("/snapshots", HttpMethod.GET, "", params);
    },

    getTransfer(id: string): Promise<Transfer> {
      return provider.send(`/transfer/trace/${id}`, HttpMethod.GET);
    },

    payments(opts: RawTransactionRequest): Promise<RawTransactionPayment> {
      return provider.send("/payments", HttpMethod.POST, opts);
    },

    transactions(opts: RawTransactionRequest) {
      return provider.send("/transactions", HttpMethod.POST, opts);
    },

    // this API is only for reading transfers, not deposits or withdrawals.
    transfer(opts: CreateTransferPayload): Promise<Transfer> {
      return provider.send("/transfers", HttpMethod.POST, opts);
    }
  };
}
