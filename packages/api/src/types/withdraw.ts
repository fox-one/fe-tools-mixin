export interface Withdrawal {
  type: string;
  snapshot_id: string;
  transaction_hash: string;
  asset_id: string;
  amount: string;
  trace_id: string;
  created_at: string;
}

export interface Address {
  type: string;
  address_id: string;
  asset_id: string;
  destination: string;
  tag: string;
  label: string;
  fee: string;
  reserve: string;
  dust: string;
  updated_at: string;
}

export interface DeleteAddressPayload {
  pin: string;
}

export interface CreateAddressPayload {
  asset_id: string;
  label: string;
  destination: string;
  tag: string;
  pin: string;
}

export interface WithdrawPayload {
  address_id: string;
  amount: string;
  pin: string;
  trace_id: string;
}
