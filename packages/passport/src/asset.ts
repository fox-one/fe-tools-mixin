import { isMVM, State } from "./index";

export default function (state: State) {
  return async (id: string) => {
    if (state.channel === "mixin") {
      return await state.mixin.endpoints.getAsset(id);
    }

    if (state.channel === "fennec") {
      return await state.fennec.ctx?.wallet.getAsset(id);
    }

    if (isMVM(state.channel)) {
      return await state.mvm.getAsset(id);
    }

    return null;
  };
}
