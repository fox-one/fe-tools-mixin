import { VueConstructor } from "vue/types/umd";

import Fennec from "@foxone/fennec-dapp";
import MixinAPI from "./mixin-apis";
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

// ATTENTION: in order to get Mixin OAuth Token correnctly
// remember set pkce and scope correnctly in @foxone/UIKit options
export interface PassportOptions {
  origin: string;
  chainId?: string; // mvm chain select
  infuraId?: string; // need by mvm walletconnect
  JWTPayload?: any; // need by fennec signToken

  // if customizeToken = false:
  // mvm and fennec channel will return access token for https://api.mixin.one/me
  // developer can save this token to access Mixin Messenger backend
  // ATTENTION: /me token has a short expire time (about one day)
  // token will be refreshed everytime sync function executed
  // mixin oauth channel will return Mixin OAuth Token

  // if customizeToken = true:
  // developer should provide hooks for exchange token or auth code or signed message to customizeToken token
  // developer should both token and mixin_token for Mixin OAuth in order to access mixin assets
  // token will NOT be refershed in sync function
  customizeToken: boolean;

  // if signMessage = false
  // mvm will use /me token as auth type

  // if signMessage = true
  // mvm connect will ask user to sign message
  // developer should provider hooks to verfiy signature and distribute custom token
  signMessage: boolean;

  hooks: {
    beforeSignMessage?: () => Promise<SignMessageParams>;
    onDistributeToken?: (params: {
      type: "mixin_token" | "signed_message" | "mixin_code";
      code?: string;
      token?: string;
      message?: string;
      signature?: string;
    }) => Promise<{ token: string; mixin_token?: string }>;
    afterDisconnect?: () => void;
  };
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
  mvm: any | null;
  payment: ReturnType<typeof createPaymentAction>;
  sync: ReturnType<typeof createSyncAction>;
  helper: ReturnType<typeof createHelper>;
};

export type State = {
  channel: Channel;
  fennec: Fennec;
  mixin: MixinAPI;
  mvm: any | null;
  mixin_token?: string;
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
    mixin_token: "",
    mvm: null,
    token: ""
  };

  state.mixin.use((configs) => ({
    ...configs,
    headers: {
      ...configs.headers,
      Authorization: `Bearer ${
        options.customizeToken ? state.mixin_token : state.token
      }`
    }
  }));

  if (typeof MVM !== "undefined") {
    state.mvm = new MVM({
      chainId: options.chainId,
      infuraId: options.infuraId
    });
    state.mvm.on("disconnect", () => {
      options.hooks.afterDisconnect?.();
    });
  }

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
