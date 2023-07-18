import metamask from "./metamask";
import walletconnect from "./walletconnect";
import onekey from "./onekey";

export default async function (
  type: "metamask" | "walletconnect" | "onekey",
  config
): Promise<any> {
  if (type === "metamask") {
    return metamask();
  } else if (type === "onekey") {
    return onekey();
  } else {
    return walletconnect(config.walletConnectProjectId);
  }
}
