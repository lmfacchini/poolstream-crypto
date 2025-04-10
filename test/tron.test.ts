import { describe, expect, test } from "@jest/globals";
import { Tron } from "../src/networks/tron";
import axios from "axios";

// {
//     privateKey: '26b74640ac04960ef2d75d0b1cab16d85c641133d917143b1b1d9360064c39db',
//     publicKey: '9600ed293cd7c6dfd7ff4ba906915aa3a5ab633c5945c089d85bc12f23b107c228aabbf72cef3b574c6d35d6685efd429be79a30744e99c7c30775ddb1df0a43',
//     address: 'TBUAsJgFBRfSRMEmqedLrqFWp5ZUMJVSXP'
// }

describe("Tron network", () => {
  const tron = new Tron();

  test("Sign Transaction", async () => {
    const response = await axios.post(
      "http://localhost:3002/private/rest/v1/tron/payments",
      [
        {
          from: "TXZVUD28uxRqcd85WdnPVAW7uLuYSHA83E",
          to: "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs",
          amount: "1000000",
        },
      ]
    );

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.data).toBeDefined();
    expect(response.data.transactions).toBeDefined();

    const signedTransactions = await tron.signTransaction(
      response.data.transactions[0].natural,
      "B0E24DE6E258E610266F2B4DB2E2834698ED18722747A5A30117ADE4D7A7BB7C"
    );
  });
  test("Gerate Wallet", async () => {
    const wallet = await tron.generateWallet();

    expect(wallet).toBeDefined();
    expect(wallet.address).toBeDefined();
    expect(wallet.secret).toBeDefined();
    expect(wallet.raw).toBeDefined();
  });
});
