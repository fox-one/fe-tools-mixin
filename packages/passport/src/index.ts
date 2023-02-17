import { VueConstructor } from "vue/types/umd";

import Fennec from "@foxone/fennec-dapp";
import MixinAPI from "@foxone/mixin-api";
import MVM from "@foxone/mvm";
import createAuthAction from "./auth";
import createAssetsAction from "./assets";
import createAssetAction from "./asset";
import createPaymentAction from "./payment";
import createSyncAction from "./sync";
import createHelper from "./helper";

export interface SignMessageParams {
  domain?: string;
  statement?: string;
  uri?: string;
  version?: string;
  chainId?: number;
  expirationTime?: string;
  notBefore?: string;
  resources?: Array<string>;
}

export interface PassportOptions {
  origin: string;
  config: any;
  JWTPayload?: any;
  beforeSignMessage?: () => Promise<SignMessageParams>;
  afterSignMessage?: (params: {
    message: string;
    signature: string;
  }) => Promise<string>;
  onDisconnect?: () => void;
  getTokenByCode?: (code: string) => Promise<string>;
}

export type Channel =
  | "fennec"
  | "mixin"
  | "metamask"
  | "walletconnect"
  | "onekey"
  | "";

export type PassportMethods = {
  auth: ReturnType<typeof createAuthAction>;
  fennec: Fennec;
  getAssets: ReturnType<typeof createAssetsAction>;
  getAsset: ReturnType<typeof createAssetAction>;
  mvm: MVM;
  payment: ReturnType<typeof createPaymentAction>;
  sync: ReturnType<typeof createSyncAction>;
  helper: ReturnType<typeof createHelper>;
};

export type State = {
  channel: Channel;
  fennec: Fennec;
  mixin: MixinAPI;
  mvm: MVM;
  token: string;
};

declare module "vue/types/vue" {
  interface Vue {
    $passport: PassportMethods;
  }
}

export function isMVM(channel: Channel) {
  return (
    channel === "metamask" ||
    channel === "walletconnect" ||
    channel === "onekey"
  );
}

function install(Vue: VueConstructor, options: PassportOptions) {
  const state: State = {
    channel: "",
    fennec: new Fennec(),
    mixin: new MixinAPI(),
    mvm: new MVM(options.config),
    token: ""
  };

  state.mixin.provider.instance.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${state.token}`
    };

    return config;
  });

  state.mvm.on("disconnect", () => {
    options.onDisconnect?.();
  });

  Vue.prototype.$passport = {
    auth: createAuthAction(Vue, options, state),
    fennec: state.fennec,
    getAsset: createAssetAction(state),
    getAssets: createAssetsAction(state),
    helper: createHelper(state),
    mvm: state.mvm,
    payment: createPaymentAction(Vue, state),
    sync: createSyncAction(options, state)
  };
}

function Passport() {
  //
}

Passport.install = install;

export default Passport;
