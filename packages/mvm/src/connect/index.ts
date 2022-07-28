import metamask from "./metamask";
import walletconnect from "./walletconnect";
import { Config } from "../index";

export default function (
  type: "metamask" | "walletconnect",
  config: Config
): Promise<any> {
  if (type === "metamask") {
    return metamask();
  } else {
    return walletconnect(config.infuraId);
  }
}
