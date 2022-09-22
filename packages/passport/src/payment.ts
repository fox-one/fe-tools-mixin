import type { VueConstructor } from "vue/types/umd";

import { genPaymentUrl } from "@foxone/utils/mixin";
import { State } from ".";

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

export default function (Vue: VueConstructor, state: State) {
  return async (payload: PaymentPayload) => {
    const code = payload.code ?? "";
    const multisig = payload.multisig ?? false;

    let asset_id = payload?.assetId ?? "";
    let amount = payload?.amount ?? "";
    let memo = payload?.memo ?? "";

    let receivers = [];
    let threshold = 0;

    const opponent_id = payload?.recipient ?? "";
    const trace_id = payload?.traceId ?? "";
    const scheme = multisig
      ? `mixin://codes/${code}`
      : genPaymentUrl(payload as any);

    if (multisig) {
      const resp: any = await state.mixin.endpoints.codes(code);

      asset_id = resp?.asset_id;
      amount = resp?.amount;
      memo = resp?.memo;
      receivers = resp?.receivers;
      threshold = resp?.threshold;
    }

    const actions = {
      fennec: async () => {
        if (multisig) {
          await state.fennec.ctx?.wallet.multisigsPayment({ code });
        } else {
          await state.fennec.ctx?.wallet.transfer({
            amount,
            asset_id,
            memo,
            opponent_id,
            trace_id
          });
        }
      },
      mixin: () => {
        window.location.href = scheme;
      },
      mvm: async () => {
        if (multisig) {
          await state.mvm.withdraw({
            action: { extra: memo, receivers, threshold },
            amount,
            asset_id
          });
        } else {
          await state.mvm.withdraw({
            action: { extra: memo, receivers: [opponent_id], threshold: 1 },
            amount,
            asset_id
          });
        }
      }
    };

    await Vue.prototype.$uikit.payment.show({
      ...payload,
      actions,
      amount,
      assetId: asset_id,
      channel: state.channel,
      scheme
    });
  };
}
