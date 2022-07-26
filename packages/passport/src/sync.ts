import { isMVM } from "./index";

export interface AuthData {
  token: string;
  channel: string;
}

export default function (options, state) {
  return async (payload: AuthData) => {
    state.channel = payload.channel;
    state.token = payload.token;

    const connectFennec = async () => {
      await state.fennec.connect(options.origin);
      state.token = await state.fennec.ctx.wallet.signToken({ payload: {} });
    };

    const connectMVM = async (type) => {
      await state.mvm.connenct(type);
      state.token = state.mvm.getAuthToken();
    };

    if (state.channel === "fennec") {
      await connectFennec();
    }

    if (isMVM(state.channel)) {
      await connectMVM(state.channel);
    }

    return { channel: state.channel, token: state.token };
  };
}
