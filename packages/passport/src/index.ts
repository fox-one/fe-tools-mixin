import { VueConstructor } from "vue/types/umd";

import Fennec from "@foxone/fennec-dapp";
import MixinAPI from "@foxone/mixin-api";
import MVM from "@foxone/mvm";
import createAuthAction from "./auth";
import createAssetsAction from "./assets";
import createBalanceAction from "./balance";
import createPaymentAction from "./payment";
import createSyncAction from "./sync";

export interface PassportOptions {
  origin: string;
  getTokenByCode?: (code: string) => Promise<string>;
}

export type channel = "fennec" | "mixin" | "metamask" | "walletconnect";

export function isMVM(channel) {
  return channel === "metamask" || channel === "walletconnect";
}

function install(Vue: VueConstructor, options: PassportOptions) {
  const state = {
    channel: "",
    fennec: new Fennec(),
    mixin: new MixinAPI(),
    mvm: new MVM(),
    token: ""
  };

  state.mixin.provider.instance.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${state.token}`
    };

    return config;
  });

  Vue.prototype.$uikit = Vue.prototype.$uikit || {};
  Vue.prototype.$uikit.passport = {
    auth: createAuthAction(Vue, options, state),
    getAssets: createAssetsAction(state),
    getBalance: createBalanceAction(state),
    payment: createPaymentAction(Vue, state),
    sync: createSyncAction(options, state)
  };
}

function Passport() {
  //
}

Passport.install = install;

export default Passport;
