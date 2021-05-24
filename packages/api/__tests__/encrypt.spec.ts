/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  signAuthenticationToken,
  generateEd25519SessionKeypair,
  generateRSASessionKeyPair
} from "../src/encrypt";
import forge from "node-forge";

// test session, dont use this secret for transfer
import RSASession from "./keystore/rsa.json";
import Ed25519Session from "./keystore/ed25519.json";

describe("mixin encrypts", () => {
  test("generateRSASessionKeyPair should be valid", () => {
    const keypair = generateRSASessionKeyPair();
    const privateKey = forge.pki.privateKeyFromPem(keypair.privateKey);
    const body = forge.util.decode64(keypair.publicKey).toString();

    const publicKey = forge.pki.publicKeyFromAsn1(
      forge.asn1.fromDer(body)
    ) as any;

    const md = forge.md.sha1.create();

    md.update("sign this", "utf8");
    const signature = privateKey.sign(md);
    const verified = publicKey.verify(md.digest().bytes(), signature);

    expect(verified).toBe(true);
  });

  test("generateEd25519SessionKeypair should be valid", () => {
    const keypair = generateEd25519SessionKeypair();
    const privateKey = Buffer.from(keypair.privateKey, "base64");
    const publicKey = Buffer.from(keypair.publicKey, "base64");
    const message = "test";
    const signature = forge.pki.ed25519.sign({
      encoding: "utf8",
      message,
      privateKey
    });
    const verified = forge.pki.ed25519.verify({
      encoding: "utf8",
      message,
      publicKey,
      signature
    });

    expect(verified).toBe(true);
  });

  test("signAuthenticationToken with rsa session", () => {
    const { client_id, private_key, session_id } = RSASession;
    const endpoint = {
      data: "",
      method: "GET",
      uri: "/assets"
    } as const;
    const token = signAuthenticationToken(
      client_id,
      session_id,
      private_key,
      endpoint.method,
      endpoint.uri,
      endpoint.data
    );

    expect(typeof token).toBe("string");
  });

  test("signAuthenticationToken with ed25519 session", () => {
    const { client_id, private_key, session_id } = Ed25519Session;
    const endpoint = {
      data: "",
      method: "GET",
      uri: "/assets"
    } as const;
    const token = signAuthenticationToken(
      client_id,
      session_id,
      private_key,
      endpoint.method,
      endpoint.uri,
      endpoint.data
    );

    expect(typeof token).toBe("string");
  });
});
