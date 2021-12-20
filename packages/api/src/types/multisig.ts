export interface MultisigRequest {
  type: string;
  request_id: string;
  user_id: string;
  asset_id: string;
  amount: string;
  threshold: string;
  senders: string[];
  receivers: string[];
  signers: string[];
  memo: string;
  action: string;
  state: string;
  transaction_hash: string;
  raw_transaction: string;
  created_at: string;
  code_id: string;
}

export interface MultisigsRequestPayload {
  action: string;
  raw: string;
}

export interface MultisigsOutputsParams {
  members?: string;
  threshold?: number;
  state?: "unspent" | "signed" | "spent";
  offset: string;
  limit?: number;
}

export interface MultisigUTXO {
  type: string;
  user_id: string;
  utxo_id: string;
  asset_id: string;
  transaction_hash: string;
  output_index: number;
  amount: number;
  threshold: number;
  members: string[];
  memo: string;
  state: string;
  signed_tx: string;
  signed_by: string;
  created_at: string;
  updated_at: string;
}
