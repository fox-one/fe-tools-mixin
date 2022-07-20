import type { PassportOptions } from "./index";
import type { VueConstructor } from "vue/types/umd";

import { isMVM } from "./index";

export default function (Vue: VueConstructor, options: PassportOptions, state) {
  const connectFennec = async () => {
    await state.fennec.connect(options.origin);
    state.token = await state.fennec.ctx.wallet.signToken({ payload: {} });
  };

  const connectMVM = async (type) => {
    await state.mvm.connenct(type);
    state.token = state.mvm.getAuthToken();
  };

  return () => {
    const { getTokenByCode } = options;

    return new Promise((resolve, reject) => {
      Vue.prototype.$uikit.auth.show({
        checkFennec: () => state.fennec.isAvailable(),
        handleAuth: async (data) => {
          state.channel = data.type;

          if (state.channel === "fennec") {
            await connectFennec();
            resolve({ channel: state.channel, token: state.token });
          }

          if (isMVM(state.channel)) {
            await connectMVM(state.channel);
            resolve({ channel: state.channel, token: state.token });
          }

          if (state.channel === "mixin") {
            if (data.token) {
              state.token = data.token;
            } else {
              if (!getTokenByCode) {
                return reject("No auth actions provided");
              }

              state.token = await getTokenByCode(data.code);
            }

            resolve({ channel: state.channel, token: state.token });
          }
        },
        handleError(error) {
          reject(error);
        }
      });
    });
  };
}
