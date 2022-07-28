import bridge from "../src/bridge";

describe("test bridge apis", () => {
  test("getTokenList", async (done) => {
    try {
      const account = "0xde04eDA29F6b031BfD28eB4e62e063aF886254D6";
      const data = await bridge.getTokenList(account);

      expect(data).toBeTruthy();
      done();
    } catch (error) {
      done(error);
    }
  });
});
