import Mixin, { createEndpoints, encrypts, providers } from "../src";
import axios from "axios";

// test session, dont use this secret for transfer
import RSASession from "./keystore/rsa.json";
import Ed25519Session from "./keystore/ed25519.json";
import { signEncryptedPin } from "../src/encrypt";

describe("mixin sdk contents", () => {
  test("encrypts should be exported", () => {
    expect(typeof encrypts.generateEd25519SessionKeypair).toBe("function");
    expect(typeof encrypts.generateRSASessionKeyPair).toBe("function");
    expect(typeof encrypts.signAuthenticationToken).toBe("function");
  });

  test("endpoints should work properly with rsa session", async (done) => {
    const { client_id, private_key, session_id } = RSASession;

    const provider = new providers.HttpProvider();

    provider.instance.interceptors.request.use((config) => {
      const url = axios.getUri(config);
      const token = encrypts.signAuthenticationToken(
        client_id,
        session_id,
        private_key,
        config.method ?? "",
        url,
        config.data ?? ""
      );

      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

      return config;
    });

    const endpoints = createEndpoints(provider);

    try {
      const res = await endpoints.getAssets();

      expect(Array.isArray(res)).toBe(true);
      done();
    } catch (error) {
      done(error);
    }
  });

  // test("endponts should work properly with ed25519 session", async (done) => {
  //   const { client_id, private_key, session_id } = Ed25519Session;
  //   const provider = new providers.HttpProvider();

  //   provider.instance.interceptors.request.use((config) => {
  //     const url = axios.getUri(config);
  //     const token = encrypts.signAuthenticationToken(
  //       client_id,
  //       session_id,
  //       private_key,
  //       config.method ?? "",
  //       url,
  //       config.data ?? ""
  //     );

  //     config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

  //     return config;
  //   });

  //   const endpoints = createEndpoints(provider);

  //   try {
  //     const res = await endpoints.getAssets();

  //     expect(Array.isArray(res)).toBe(true);
  //     done();
  //   } catch (error) {
  //     done(error);
  //   }
  // });

  test("mixin api should work properly", async (done) => {
    const mixin = new Mixin();

    mixin.config(RSASession);

    try {
      await mixin.endpoints.getAssets();
      done();
    } catch (error) {
      done(error);
    }
  });

  test("rsa pin should be valid", async (done) => {
    const mixin = new Mixin();

    mixin.config(RSASession);

    try {
      const { pin, pin_token, private_key, session_id } = RSASession;
      const oldPin = signEncryptedPin(pin, pin_token, session_id, private_key);
      const newPin = signEncryptedPin(pin, pin_token, session_id, private_key);

      await mixin.endpoints.updatePin(oldPin, newPin);
      done();
    } catch (error) {
      done(error);
    }
  });

  test("ed25519 pin should be valid", async (done) => {
    const mixin = new Mixin();

    mixin.config(Ed25519Session);

    try {
      const { pin, pin_token, private_key, session_id } = Ed25519Session;
      const oldPin = signEncryptedPin(pin, pin_token, session_id, private_key);
      const newPin = signEncryptedPin(pin, pin_token, session_id, private_key);

      await mixin.endpoints.updatePin(oldPin, newPin);
      done();
    } catch (error) {
      done(error);
    }
  });
});
