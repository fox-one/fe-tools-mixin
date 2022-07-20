import type { PaymentPayload } from "./index";
import type { VueConstructor } from "vue/types/umd";

import { genPaymentUrl } from "@foxone/utils/mixin";

export default function (Vue: VueConstructor, state) {
  return async (payload: PaymentPayload) => {
    const code = payload.code ?? "";
    const multisig = payload.multisig ?? false;
    const asset_id = payload?.assetId ?? "";
    const opponent_id = payload?.recipient ?? "";
    const amount = payload?.amount ?? "";
    const trace_id = payload?.traceId ?? "";
    const memo = payload?.memo ?? "";
    const scheme = multisig
      ? `mixin://codes/${code}`
      : genPaymentUrl(payload as any);

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
        window.location.href === scheme;
      },
      mvm: async () => {
        if (multisig) {
          const resp: any = await state.mixin.endpoints.codes(code);
          const receivers = resp?.receivers;
          const threshold = resp?.threshold;
          const memo = resp?.memo;

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
      actions,
      channel: state.channel,
      checker: payload.checker,
      info: payload.info,
      scheme
    });
  };
}
