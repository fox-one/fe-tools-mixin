import { ProviderInterface } from "../types";

import createAssetEndpoints from "./asset";
import createCircleEndpoints from "./circle";
import createCollectibleEndpoints from "./collectible";
import createConversationEndpoints from "./conversation";
import createMessageEndpoints from "./message";
import createMultisigEndpoints from "./multisig";
import createNetworkEndpoints from "./network";
import createOAuthEndpoints from "./oauth";
import createPinEndpoints from "./pin";
import createTransferEndpoints from "./transfer";
import createUserEndpoints from "./user";
import createWithdrawEndpoints from "./withdraw";

const createEndpoints = function (provider: ProviderInterface) {
  return {
    ...createAssetEndpoints(provider),
    ...createCircleEndpoints(provider),
    ...createCollectibleEndpoints(provider),
    ...createConversationEndpoints(provider),
    ...createMessageEndpoints(provider),
    ...createMultisigEndpoints(provider),
    ...createNetworkEndpoints(provider),
    ...createOAuthEndpoints(provider),
    ...createPinEndpoints(provider),
    ...createTransferEndpoints(provider),
    ...createUserEndpoints(provider),
    ...createWithdrawEndpoints(provider)
  };
};

export default createEndpoints;

export type Endpoints = ReturnType<typeof createEndpoints>;
