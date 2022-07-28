import { utils } from "ethers";

export function fmtWithdrawAmount(amount: string, isXIN = false) {
  return utils.parseUnits(amount, isXIN ? 18 : 8).toString();
}

export function fmtBalance(amount: string, isXIN = false) {
  return utils.formatUnits(amount, isXIN ? 18 : 8).toString();
}
