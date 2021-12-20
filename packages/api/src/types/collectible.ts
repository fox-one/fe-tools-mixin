import { PaginationParams } from "./api";

export interface CollectibleRequestPayload {
  action: string;
  raw: string;
}

export type CollectibleAction = "sign" | "cancel" | "unlock";

export interface GetCollectibleOutputsParams extends PaginationParams {
  state: "unspent" | "signed" | "spent";
  members: string;
  threshold: number;
}

export interface CollectibleToken {
  type: string;
  token_id: string;
  group: string;
  token: string;
  mixin_id: string;
  nfo: string;
  meta: {
    group: string;
    name: string;
    description: string;
    icon_url: string;
    media_url: string;
    mime: string;
    hash: string;
  };
  created_at: string;
}
