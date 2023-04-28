# Mixin Account Passport

Vue plugin for multi auth channel for mixin account, support Mixin Apps, fennec, and MVM, depend on @foxone/uikit@3.x.

**Please be attention: This repo is for @foxone/mixin-passport version 0.x, if you are using @foxone/uikit@4.x Please visit [Version 1.x](https://github.com/pandodao/pando-ui/tree/main/packages/passport)**

## Usage

### install from npm

```shell
yarn add @foxone/uikit@3 @foxone/mixin-passport@0.1
```

### install plugins

```ts
import Vue from "vue";
import UIKit from "@foxone/uikit";
import Passport from "@foxone/mixin-passport";

Vue.use(UIKit, {
  //...configs for @foxone/uikit
});

Vue.use(Passport, PassportOptions);

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
```

### use actions of passport in need

#### get auth token, `this` refer to Vue instance

```ts
const authData = await this.$passport.auth();

export interface AuthData {
  token: string;
  mixin_token?: string;
  channel: string;
}
```

#### sync locale auth data with passport

```ts
const tokenLocale = "";
const channelLocale = "";
const mixinToken = "";

const { token, channel } = await this.$passport.sync({
  channel: channelLocale,
  token: tokenLocale
  mixin_token: mixinToken
});
```

#### payment according to auth channel

```ts
//transfer
await this.$passport.payment({
  assetId: "...",
  amount: "...",
  recipient: "...",
  traceId: "...",
  memo: "...",
  info: {
    amount: "...",
    logo: "...",
    symbol: "..."
  },
  checker: () => {
    // async checker...
  }
});

// multisig payment
await this.$passport.payment({
  code, // https://api.mixin.one/codes/:code
  info: {
    amount: "...",
    logo: "...",
    symbol: "..."
  },, // display purpose
  multisig: true,
  checker: () => {
    // async checker...
  }
});


export interface PaymentPayload {
// transfer params
assetId?: string;
amount?: string;
recipient?: string;
traceId?: string;
memo?: string;
// multisig params
code?: string;
multisig?: boolean;
// common params
hideCheckingModal?: boolean;
checker?: () => Promise<boolean>;
}
```

#### get wallet asset

```ts
const asset = await this.$passport.getAsset();
```

#### get wallet assets

```ts
const assets = await this.$passport.getAssets();
```
