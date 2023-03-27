import { isMVM } from "./index";

export interface AuthData {
  token: string;
  mixin_token?: string;
  channel: string;
}

export default function (options, state) {
  return async (payload: AuthData) => {
    state.channel = payload.channel;
    state.token = payload.token;
    state.mixin_token = payload.mixin_token;

    if (state.channel === "fennec") {
      await state.fennec.connect(options.origin);

      if (options.refreshToken) {
        state.token =
          (await state.fennec.ctx.wallet.signToken({ payload: {} })) ?? "";
      }
    }

    if (isMVM(state.channel)) {
      await state.mvm.connenct(state.channel);

      if (options.refreshToken) {
        state.token = state.mvm.getAuthToken();
      }
    }

    return { channel: state.channel, token: state.token };
  };
}
