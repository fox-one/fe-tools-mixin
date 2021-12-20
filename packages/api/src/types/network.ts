import { SnapshotSource, SnapshotType } from "./transfer";
import { PaginationParams, Order } from "./api";

export interface NetworkAsset {
  amount: string;
  asset_id: string;
  chain_id: string;
  icon_url: string;
  name: string;
  snapshots_count: number;
  symbol: string;
  type: string;
}

export interface NetworkTopAsset {
  type: string;
  asset_id: string;
  chain_id: string;
  symbol: string;
  name: string;
  icon_url: string;
  price_btc: string;
  price_usd: string;
  change_btc: string;
  change_usd: string;
  asset_key: string;
  mixin_id: string;
  reserve: string;
  confirmations: number;
  capitalization: number; // Market cap.
  liquidity: string; // The amount of this asset in Minxin.
}

export interface NetworkChain {
  type: string;
  chain_id: string;
  name: string;
  icon_url: string;
  managed_block_height: number; // The public chain height synchronized by Minxin.
  deposit_block_height: number; // The public chain height where Mixin handles the deposit.
  external_block_height: number; // Third party API block height.
  threshold: number; // Deposit required comfirmations.
  withdrawal_pending_count: number; // The amount being withdrawn.
  withdrawal_timestamp: number;
  withdrawal_fee: number; // Withdrawal Fee.
  is_synchronized: boolean; // Whether the node data synchronization of the current public chain normal.
}

export interface NetworkSnapshotsParams extends PaginationParams {
  asset: string;
  order?: Order;
}

export interface NetworkSnapshot {
  amount: string;
  asset: {
    asset_id: string;
    chain_id: string;
    icon_url: string;
    name: string;
    symbol: string;
    type: string;
  };
  created_at: string;
  data: string;
  snapshot_id: string;
  source: SnapshotSource;
  type: SnapshotType;
  // Options only for user (or App) who has access.
  // 4 private fields that only be returend with correct permission
  user_id?: string;
  trace_id?: string;
  opponent_id?: string;
}

export interface NetworkTickerParams {
  asset: string;
  offset?: string;
}

export interface NetworkTicker {
  type: string;
  price_btc: string;
  price_usd: string;
}

export interface ExternalTransactionParams {
  asset?: string;
  destination?: string;
  tag?: string;
  limit: number;
  offset: string;
}

export interface Transaction {
  type: string;
  transaction_id: string;
  transaction_hash: string;
  sender: string;
  amount: string;
  destination: string;
  tag: string;
  asset_id: string;
  chain_id: string;
  confirmations: number;
  threshold: number;
  created_at: string;
}
