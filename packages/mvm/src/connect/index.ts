import metamask from "./metamask";
import walletconnect from "./walletconnect";

export default function (type: "metamask" | "walletconnect"): Promise<any> {
  if (type === "metamask") {
    return metamask();
  } else {
    return walletconnect();
  }
}
