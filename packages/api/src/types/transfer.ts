import { PaginationParams, Order } from "./api";

export interface CreateTransferPayload {
  asset_id: string;
  opponent_id: string;
  amount: string;
  pin?: string;
  trace_id: string;
  memo: string;
}

export interface Transfer {
  type: string;
  snapshot_id: string;
  opponent_id: string;
  asset_id: string;
  amount: string;
  opening_balance: string;
  closing_balance: string;
  trace_id: string;
  memo: string;
  created_at: string;
}

export interface OpponentMultisig {
  receivers: string[];
  threshold: number;
}

export interface RawTransactionRequest {
  asset_id: string;
  opponent_multisig?: OpponentMultisig;
  amount: string;
  pin?: string;
  trace_id?: string;
  memo?: string;
}

export enum SnapshotType {
  DEPOSIT = "deposit",
  TRANSFER = "transfer",
  WITHDRAWAL = "withdrawal",
  WITHDRAWAL_FEE_CHARGED = "fee",
  WITHDRAWAL_FAILED = "rebate",
  RAW = "raw"
}

export enum SnapshotSource {
  DEPOSIT_CONFIRMED = "DEPOSIT_CONFIRMED",
  TRANSFER_INITIALIZED = "TRANSFER_INITIALIZED",
  WITHDRAWAL_INITIALIZED = "WITHDRAWAL_INITIALIZED",
  WITHDRAWAL_FEE_CHARGED = "WITHDRAWAL_FEE_CHARGED",
  WITHDRAWAL_FAILED = "WITHDRAWAL_FAILED"
}

export interface SnapshotQueryParams extends PaginationParams {
  order?: Order;
  asset?: string;
  opponent?: string;
  destination?: string;
  tag?: string;
}

export interface Snapshot {
  amount: string;
  asset_id: string;
  closing_balance: string;
  counter_user_id: string;
  created_at: string;
  memo: string;
  opening_balance: string;
  opponent_id: string;
  opponent?: string;
  receiver?: string;
  sender?: string;
  snapshot_at: string;
  snapshot_hash: string;
  snapshot_id: string;
  trace_id: string;
  transaction_hash: string;
  type: SnapshotType;
}

export interface RawTransactionPayment {
  amount: string;
  asset_id: string;
  code_id: string;
  created_at: string;
  memo: string;
  receivers: string[];
  status: string;
  threshold: number;
  trace_id: string;
  type: string;
}
