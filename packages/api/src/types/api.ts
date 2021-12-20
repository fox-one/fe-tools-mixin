export type MixinNetworkResponse = {
  data: unknown;
  error: { code: number; status: number; description: string };
};

export type PaginationParams = {
  limit?: number;
  offset?: string;
};

export type Order = "ASC" | "DESC";
