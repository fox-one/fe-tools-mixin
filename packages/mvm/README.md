# Tools for Mixin Virtual Machine

Provider a tool for MVM connection, get assets, withdarw...

## Usage

install from npm

```shell
yarn add @foxone/mvm
```

connect to MVM via metamask or walletconnect

```ts
import MVM from "@foxone/mvm";

const mvm = new MVM({
  infuraId: "..."
});

await mvm.connect("metamask");
// await mvm.connect("walletconnect")
```

after connected to MVM, interaction is avaliable.

withdraw to mixin:

```ts
// typeof payload
export interface WithdrawPayload {
  asset_id: string;
  amount: string | number;
  action: WithdrawAction;
}

export interface WithdrawAction {
  receivers: string[];
  threshold?: number;
  extra: string;
}

const payload: WithdrawPayload = "...";

mvm.withdraw(payload);
```

get asset balance:

```ts
// same struct as https://api.mixin.one/asset/:id
const asset = await mvm.getAsset("...asset id");
```

get wallet assets:

```ts
// same struct as https://api.mixin.one/assets
const assets = await mvm.getAssets();
```

get auth token:

```ts
// jwt token for https://api.mixin.one/me
const token = await mvm.getAuthToken();
```
