import type {
  ProviderInterface,
  CreateAddressPayload,
  CreateTransferPayload,
  SnapshotQueryParams,
  NetworkSnapshotsParams,
  MultisigsOutputsParams,
  ExternalTransactionParams,
  WithdrawPayload,
  MultisigsRequestPayload,
  Asset,
  NetworkAsset,
  Withdrawal,
  User,
  Transfer,
  Snapshot,
  Address,
  Fee,
  Ticker,
  MultisigUTXO,
  MultisigRequest,
  Transaction,
  ExchangeRate,
  RelationshipActionPayload,
  NetworkSnapshot,
  RawTransactionRequest,
  RawTransactionPayment,
  UpdateProfilePayload,
  DeleteAddressPayload
} from "./types";

import { HttpMethod } from "./types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createEndpoints(provider: ProviderInterface) {
  return {
    codes(code: string) {
      return provider.send(`/codes/${code}`, HttpMethod.GET);
    },

    createMultisigs(opts: MultisigsRequestPayload): Promise<MultisigRequest> {
      return provider.send("/multisigs/requests", HttpMethod.POST, opts);
    },

    createUser(secret: string, name: string) {
      return provider.send<User>("/users", HttpMethod.POST, {
        full_name: name,
        session_secret: secret
      });
    },

    createWithdrawAddress(opts: CreateAddressPayload): Promise<Withdrawal> {
      return provider.send("/addresses", HttpMethod.POST, opts);
    },

    deleteWithdrawAddress(id: string, opts: DeleteAddressPayload) {
      return provider.send(`/addresses/${id}/delete`, HttpMethod.POST, opts);
    },

    getAsset: (id: string) => {
      return provider.send<Asset>(`/assets/${id}`, HttpMethod.GET);
    },

    getAssetWithdrawAddresses(assetId: string): Promise<Address[]> {
      return provider.send(`/assets/${assetId}/addresses`, HttpMethod.GET);
    },

    getAssets: () => {
      return provider.send<Asset[]>("/assets", HttpMethod.GET);
    },

    getBlockingUsers(): Promise<User[]> {
      return provider.send("/blocking_users", HttpMethod.GET);
    },

    getExchangeRates(): Promise<ExchangeRate[]> {
      return provider.send("/fiats", HttpMethod.GET);
    },

    getExternalTransactions(
      opts: ExternalTransactionParams
    ): Promise<Transaction[]> {
      return provider.send("/external/transactions", HttpMethod.GET, "", opts);
    },

    getFee(assetId: string): Promise<Fee> {
      return provider.send(`/assets/${assetId}/fee`, HttpMethod.GET);
    },

    getFriends(): Promise<User[]> {
      return provider.send("/friends", HttpMethod.GET);
    },

    getMe(): Promise<User> {
      return provider.send("/me", HttpMethod.GET);
    },

    getMultisigsOutputs(opts: MultisigsOutputsParams): Promise<MultisigUTXO> {
      return provider.send("/multisigs/outputs", HttpMethod.GET, "", opts);
    },

    getNetworkAsset(id: string): Promise<NetworkAsset> {
      return provider.send(`/network/assets/${id}`, HttpMethod.GET);
    },

    getNetworkSnapshot(id: string): Promise<NetworkSnapshot> {
      return provider.send(`/network/snapshots/${id}`, HttpMethod.GET);
    },

    getNetworkSnapshots(opts: NetworkSnapshotsParams): Promise<Snapshot[]> {
      return provider.send("/network/snapshots", HttpMethod.GET, "", opts);
    },

    getNetworkTopAssets(): Promise<Asset[]> {
      return provider.send("/network/assets/top", HttpMethod.GET);
    },

    getSnapshot(id: string): Promise<Snapshot> {
      return provider.send(`/snapshots/${id}`, HttpMethod.GET);
    },

    getSnapshots(opts: SnapshotQueryParams): Promise<Snapshot[]> {
      return provider.send("/snapshots", HttpMethod.GET, "", opts);
    },

    getUser(id: string): Promise<User> {
      return provider.send(`/users/${id}`, HttpMethod.GET);
    },

    getWithdrawAddress(id: string) {
      return provider.send(`/addresses/${id}`, HttpMethod.GET);
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
    },

    payments(opts: RawTransactionRequest): Promise<RawTransactionPayment> {
      return provider.send("/payments", HttpMethod.POST, opts);
    },

    relationships(opts: RelationshipActionPayload) {
      return provider.send("relationships", HttpMethod.POST, opts);
    },

    searchNetworkAsset(str: string): Promise<Asset[]> {
      return provider.send(`/network/assets/search/${str}`, HttpMethod.GET);
    },

    searchUser(str: string): Promise<User> {
      return provider.send(`/search/${str}`, HttpMethod.GET);
    },

    ticker(opts: { asset: string; offset: string }): Promise<Ticker> {
      return provider.send("/ticker", HttpMethod.GET, "", opts);
    },

    transactions(opts: RawTransactionRequest) {
      return provider.send("/transactions", HttpMethod.POST, opts);
    },

    transfer(opts: CreateTransferPayload) {
      return provider.send<Transfer>("/transfers", HttpMethod.POST, opts);
    },

    updatePin(oldPin: string, newPin: string) {
      return provider.send<User>("/pin/update", HttpMethod.POST, {
        old_pin: oldPin,
        pin: newPin
      });
    },

    updateProfile(opts: UpdateProfilePayload) {
      return provider.send("/me", HttpMethod.POST, opts);
    },

    withdraw(opts: WithdrawPayload): Promise<Withdrawal> {
      return provider.send("/withdrawals", HttpMethod.POST, opts);
    }
  };
}

export default createEndpoints;

export type Endpoints = ReturnType<typeof createEndpoints>;
