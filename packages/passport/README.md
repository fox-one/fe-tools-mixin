# Mixin Account Passport

Vue plugin for multi auth channel for mixin account, support Mixin Apps, fennec, and MVM, depend on @foxone/uikit.

## Usage

install from npm

```shell
yarn add @foxone/uikit @foxone/mixin-passport
```

install plugins

```ts
import Vue from "vue";
import UIKit from "@foxone/uikit";
import Passport from "@foxone/mixin-passport";

Vue.use(UIKit, {
  //...configs for @foxone/uikit
});
Vue.use(Passport, {
  origin: "...",
  config: { infuraId: "..." }
  // ...
});
```

use actions of passport in need

get auth token, `this` refer to Vue instance

```ts
const { token, channel } = await this.$passport.auth();
```

sync locale auth data with passport

```ts
const tokenLocale = "";
const channelLocale = "";

const { token, channel } = await this.$passport.sync({
  channel: channelLocale,
  token: tokenLocale
});
```

payment according to auth channel

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
```

get wallet asset

```ts
const asset = await this.$passport.getAsset();
```

get wallet assets

```ts
const assets = await this.$passport.getAssets();
```
