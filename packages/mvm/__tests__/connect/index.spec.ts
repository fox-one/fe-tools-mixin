import { generateTestingUtils } from "eth-testing";
import connect from "../../src/connect";

describe("test mvm connect", () => {
  test("connect with metamask", async (done) => {
    const testingUtils = generateTestingUtils({ providerType: "MetaMask" });

    (global as any).window.ethereum = testingUtils.getProvider();

    try {
      const provider = await connect("metamask", { infuraId: "" });

      expect(provider.isMetaMask).toBe(true);
      done();
    } catch (error) {
      done(error);
    }
  });

  // test("connect with walletconnect", async (done) => {
  //   try {
  //     const provider = await connect("walletconnect", {
  //       infuraId: "a018fa2f735a435f9a7917f0d429c61a"
  //     });

  //     expect(provider).toBeTruthy();
  //     done();
  //   } catch (error) {
  //     done(error);
  //   }
  // }, 100000);
});
