import { utils } from "ethers";

export function fmtWithdrawAmount(amount: string, isNative = false) {
  return utils.parseUnits(amount, isNative ? 18 : 8).toString();
}

export function fmtBalance(amount: string, isNative = false) {
  return utils.formatUnits(amount, isNative ? 18 : 8).toString();
}

export function wrapPromiseWithTimeout<T>(
  promise: Promise<T> | undefined,
  delay = 30000
) {
  if (!promise) return;

  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Operation Timeout");
      }, delay);
    })
  ]);
}
