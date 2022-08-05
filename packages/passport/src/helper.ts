import { isMVM, State } from "./index";

export default function (state: State) {
  return {
    isMVM: () => isMVM(state.channel),
    logged: () => Boolean(state.token),
    watchAsset: (params: {
      assetId: string;
      image: string;
      symbol: string;
    }) => {
      if (isMVM(state.channel)) {
        state.mvm.watchAsset(params);
      }
    }
  };
}
