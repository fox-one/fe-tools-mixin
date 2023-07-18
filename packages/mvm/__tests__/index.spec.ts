import { generateTestingUtils } from "eth-testing";
import MVM from "../src/index";

describe("test mvm", () => {
  const account = "0xde04eDA29F6b031BfD28eB4e62e063aF886254D6";
  const mvm = new MVM({
    walletConnectProjectId: "e7d132a26807a6184b4985e3ab742920"
  });
  const testingUtils = generateTestingUtils({ providerType: "MetaMask" });

  beforeAll(() => {
    (global as any).window.ethereum = testingUtils.getProvider();
  });

  afterEach(() => {
    testingUtils.clearAllMocks();
    mvm.clear();
  });

  test("connect to mvm", async (done) => {
    testingUtils.mockRequestAccounts([account]);

    try {
      await mvm.connenct("metamask");

      expect(mvm.connected).toBe(true);
      expect(mvm.account).toEqual(account);
      done();
    } catch (error) {
      done(error);
    }
  });

  // test("get token list", async (done) => {
  //   testingUtils.mockRequestAccounts([account]);

  //   try {
  //     await mvm.connenct("metamask");

  //     const tokens = await mvm.getAssets();

  //     expect(Array.isArray(tokens)).toBe(true);
  //     console.log(tokens);
  //     done();
  //   } catch (error) {
  //     done(error);
  //   }
  // }, 100000);
});
