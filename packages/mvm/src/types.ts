export interface MVMConfig {
  chainId?: boolean;
  walletConnectProjectId: string;
}

export interface ProxyUser {
  contract: string;
  created_at: string;
  full_name: string;
  key: {
    client_id: string;
    private_key: string;
    session_id: string;
  };
  session_id: string;
  user_id: string;
}

export interface WithdrawAction {
  receivers: string[];
  threshold?: number;
  extra: string;
}

export interface WithdrawPayload {
  asset_id: string;
  amount: string | number;
  action: WithdrawAction;
}

export interface Token {
  balance: string;
  contractAddress: string;
  decimals: string;
  name: string;
  symbol: string;
  type: string;
  mixinAssetId: string;
}
