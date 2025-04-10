import { describe, expect, test } from "@jest/globals";
import { Ripple } from "../src/networks/ripple";
import axios from "axios";

describe("Ripple network", () => {
  const ripple = new Ripple();
  test("Ripple - Sign Transaction", async () => {
    const response = await axios.post(
      "http://localhost:3002/private/rest/v1/ripple/payments",
      [
        {
          from: "rH7DrQUMbNkQRgv4QPyjhX2kQEJ72tY9Sc",
          to: "rG4e69pktCEXr1D7H8QvPBaMX3c1CMLuM2",
          amount: "1000000",
        },
      ]
    );
    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.data).toBeDefined();
    expect(response.data.transactions).toBeDefined();

    const signedTransactions = await ripple.signTransaction(
      response.data.transactions[0].natural,
      "sEdVSdbRWrZY1V8dPcjDRfcWR6bS8ik"
    );
  });
  test("Ripple - Gerate Wallet", async () => {
    const wallet = await ripple.generateWallet();
    expect(wallet).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.secret).toBeDefined();
    expect(wallet.raw).toBeDefined();
  });
});
