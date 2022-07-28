# Mixin API

Provide a libary for Mixin Network API calls.

## Usage

install from npm:

```shell
yarn add @foxone/mixin-api
```

init instance and configration

```ts
import MixinAPI from "@foxone/mixin-api";

const api = new MixinAPI();

api.config({
  client_id: "...",
  session_id: "...",
  private_key: "..."
});

// api calls
const profile = await api.endpoints.getMe();
```

use encrypts for jwt token generation

```ts
import { signAuthenticationToken } from "@foxone/mixin-api/encrypt";

const keys = {
  client_id: "",
  session_id: "",
  private_key: ""
};

signAuthenticationToken(
  keys.client_id,
  keys.session_id,
  keys.private_key,
  "GET",
  "/me",
  ""
);
```
