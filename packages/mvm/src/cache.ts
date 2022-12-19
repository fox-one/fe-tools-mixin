import MixinAPI from "@foxone/mixin-api";

import type { Asset } from "@foxone/mixin-api/types";

export default class Cache {
  assets: Record<string, { data: Asset; time: number }> = {};

  api: MixinAPI;

  constructor(api: MixinAPI) {
    this.api = api;
  }

  async getAsset(assetId: string) {
    const now = new Date().getTime();
    const record = this.assets[assetId];

    if (record && now - record.time < 5 * 60 * 1000) {
      return record.data;
    }

    const asset = await this.api.endpoints.getAsset(assetId);

    this.assets[assetId] = { data: asset, time: new Date().getTime() };

    return asset;
  }
}
