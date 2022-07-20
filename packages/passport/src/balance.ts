import { isMVM } from "./index";

export default function (state) {
  return async (assetId: string): Promise<string> => {
    if (state.channel === "mixin") {
      const asset = await state.mixin.endpoints.getAsset(assetId);

      return asset.balance;
    }

    if (state.channel === "fennec") {
      const asset = await state.fennec.ctx?.wallet.getAsset(assetId);

      return asset?.balance ?? "";
    }

    if (isMVM(state.channel)) {
      const balance = await state.mvm.getBalance(assetId);

      return balance;
    }

    return "0";
  };
}
