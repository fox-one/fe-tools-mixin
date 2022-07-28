import { utils } from "ethers";

export function fmtWithdrawAmount(amount: string, isXIN = false) {
  return utils.parseUnits(amount, isXIN ? 18 : 8).toString();
}

export function fmtBalance(amount: string, isXIN = false) {
  return utils.formatUnits(amount, isXIN ? 18 : 8).toString();
}

export function wrapPromiseWithTimeout<T>(
  promise: Promise<T> | undefined,
  delay = 120000
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
