import type { PassportOptions } from "./index";
import type { VueConstructor } from "vue/types/umd";

import { isMVM, State, SignMessageParams } from "./index";
import { AuthData } from "./sync";

export default function (
  Vue: VueConstructor,
  options: PassportOptions,
  state: State
) {
  const connectFennec = async () => {
    await state.fennec.connect(options.origin);
    state.token =
      (await state.fennec.ctx?.wallet.signToken({
        payload: options.JWTPayload || {}
      })) ?? "";
  };

  const connectMVM = async (type, reject) => {
    await state.mvm.connenct(type);

    let params: SignMessageParams = {};

    if (options.beforeSignMessage) {
      params = await options.beforeSignMessage();
    }

    let resp: any = await state.mvm.signMessage(params);

    if (options.afterSignMessage) {
      resp = await options.afterSignMessage(resp);
    } else {
      reject("Need afterSignMessage hook to process signed message to token");
    }

    return resp;
  };

  const handleAuth = async (data, resolve, reject) => {
    state.channel = data.type;

    if (state.channel === "fennec") {
      await connectFennec();
      resolve({ channel: state.channel, token: state.token });
    }

    if (isMVM(state.channel)) {
      await connectMVM(state.channel, reject);
      resolve({ channel: state.channel, token: state.token });
    }

    if (state.channel === "mixin") {
      if (data.token) {
        state.token = data.token;
      } else {
        if (!options.getTokenByCode) {
          return reject("No auth actions provided");
        }

        state.token = await options.getTokenByCode(data.code);
      }

      resolve({ channel: state.channel, token: state.token });
    }
  };

  return (): Promise<AuthData> => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$uikit.auth.show({
        checkFennec: () => state.fennec.isAvailable(),
        checkMetamask: () => Boolean(window?.ethereum?.isMetaMask),
        checkOnekey: () => Boolean((window as any).$onekey),
        handleAuth: async (data) => {
          try {
            await handleAuth(data, resolve, reject);
          } catch (error) {
            reject(error);
          }
        },
        handleError(error) {
          reject(error);
        }
      });
    });
  };
}
