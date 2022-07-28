import { isMVM, State } from "./index";

export default function (state: State) {
  return async () => {
    if (state.channel === "mixin") {
      return await state.mixin.endpoints.getAssets();
    }

    if (state.channel === "fennec") {
      return (await state.fennec.ctx?.wallet.getAssets()) ?? [];
    }

    if (isMVM(state.channel)) {
      return await state.mvm.getAssets();
    }

    return [];
  };
}
