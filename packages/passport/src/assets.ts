import { isMVM } from "./index";

export default function (state) {
  return async (): Promise<any> => {
    if (state.channel === "mixin") {
      return await state.mixin.endpoints.getAssets();
    }

    if (state.channel === "fennec") {
      return await state.fennec.ctx?.wallet.getAssets();
    }

    if (isMVM(state.channel)) {
      return [];
    }
  };
}
