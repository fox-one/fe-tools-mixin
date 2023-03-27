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

    const mixinToken =
      (await state.fennec.ctx?.wallet.signToken({
        payload: options.JWTPayload || {}
      })) || "";

    if (options.customizeToken) {
      const resp = await options.hooks?.onDistributeToken?.({
        token: mixinToken,
        type: "mixin_token"
      });

      state.token = resp?.token ?? "";
    } else {
      state.token = mixinToken;
    }
  };

  const connectMVM = async (type, reject) => {
    await state.mvm?.connenct(type);

    if (options.signMessage) {
      let params: SignMessageParams = {};

      if (options.hooks?.beforeSignMessage) {
        params = await options.hooks.beforeSignMessage();
      }

      const signedData: any = await state.mvm?.signMessage(params);

      if (options.hooks?.onDistributeToken) {
        const resp = await options.hooks?.onDistributeToken?.({
          message: signedData?.message ?? "",
          signature: signedData?.signature ?? "",
          type: "signed_message"
        });

        state.token = resp?.token ?? "";
      } else {
        reject(
          "Need onDistributeToken hook to process signed message to token"
        );
      }
    } else {
      const mixinToken = state.mvm?.getAuthToken() ?? "";

      if (options.customizeToken) {
        const resp = await options.hooks?.onDistributeToken?.({
          token: mixinToken,
          type: "mixin_token"
        });

        state.token = resp?.token ?? "";
      } else {
        state.token = mixinToken;
      }
    }
  };

  const connectMixin = async (data, reject) => {
    if (data.token) {
      const mixinToken = data.token;

      if (options.customizeToken) {
        const resp = await options.hooks?.onDistributeToken?.({
          token: mixinToken,
          type: "mixin_token"
        });

        state.token = resp?.token ?? "";
        state.mixin_token = mixinToken;
      } else {
        state.token = mixinToken;
      }
    } else {
      if (options.hooks?.onDistributeToken) {
        const resp = await options.hooks.onDistributeToken({
          code: data.code,
          type: "mixin_code"
        });

        state.token = resp.token;
        state.mixin_token = resp.mixin_token;
      } else {
        reject("Need onDistributeToken hook to process code to tokens");
      }
    }
  };

  const handleAuth = async (data, resolve, reject) => {
    state.channel = data.type;

    if (state.channel === "fennec") await connectFennec();

    if (isMVM(state.channel)) await connectMVM(state.channel, reject);

    if (state.channel === "mixin") await connectMixin(data, reject);

    resolve({ channel: state.channel, token: state.token });
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
