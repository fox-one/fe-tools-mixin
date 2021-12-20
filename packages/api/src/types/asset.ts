export interface Asset {
  type: string;
  asset_id: string;
  chain_id: string;
  symbol: string;
  name: string;
  icon_url: string;
  balance: string;
  destination: string;
  tag: string;
  price_btc: string;
  price_usd: string;
  change_btc: string;
  change_usd: string;
  asset_key: string;
  mixin_id: string;
  confirmations: number;
  capitalization: number;
  liquidity?: string;
}

export interface Fee {
  type: string;
  asset_id: string;
  amount: string;
}

export interface ExchangeRate {
  code: string;
  rate: string;
}
