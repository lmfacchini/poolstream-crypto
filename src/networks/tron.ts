import { SignableTransaction, Wallet, Blockchain } from "./blockchain";

const TronWeb = require("tronweb");

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});
export class Tron implements Blockchain<SignableTransaction, string> {
  async signTransaction(
    transaction: SignableTransaction,
    secret: string
  ): Promise<any> {
    transaction.natural = await tronWeb.trx.sign(transaction.natural, secret);

    return transaction;
  }

  async generateWallet(): Promise<Wallet> {
    const wallet = await tronWeb.createAccount();
    return {
      secret: wallet.privateKey,
      address: wallet.address.base58,
      raw: wallet,
    };
  }
}
