import { describe, expect, test } from "@jest/globals";
import { Stellar } from "../src/networks/stellar";
import axios from "axios";
import { Keypair } from "@stellar/stellar-sdk";

// {
//     privateKey: 'SBAD67GYF4HZ6JDUSO6W3OOC7KM5TAZ2NW635LJC3R32TO3EBPOYDB5T',
//     publicKey: 'GAJGJHYO6LBAKWO5SJ36A6WSJWXOYFWZAHG73C2GJBXKTUCJNHQHAZ4U'
// }

describe("Stellar network", () => {
  const stellar = new Stellar();
  test("Stelllar - Sign Transaction", async () => {
    const response = await axios.post(
      "http://localhost:3002/private/rest/v1/stellar/payments",
      [
        {
          from: "GAJGJHYO6LBAKWO5SJ36A6WSJWXOYFWZAHG73C2GJBXKTUCJNHQHAZ4U",
          to: "GAJGJHYO6LBAKWO5SJ36A6WSJWXOYFWZAHG73C2GJBXKTUCJNHQHAZ4U",
          amount: "1000000",
        },
      ]
    );

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.data).toBeDefined();
    expect(response.data.transactions).toBeDefined();

    const signedTransactions = await stellar.signTransaction(
      response.data.transactions[0].natural,
      "SBAD67GYF4HZ6JDUSO6W3OOC7KM5TAZ2NW635LJC3R32TO3EBPOYDB5T"
    );
  });
  test("Stellar - Gerate Wallet", async () => {
    const wallet = await stellar.generateWallet();
    expect(wallet).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.secret).toBeDefined();
    expect(wallet.raw).toBeDefined();

    const array = new Uint8Array(32);

    const randomBytes = crypto.getRandomValues(array);
    const wallet1 = Keypair.fromRawEd25519Seed(Buffer.from(randomBytes));
    expect(wallet1).toBeDefined();
  });
});
