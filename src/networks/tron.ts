import { Wallet } from "./blockchain";

const TronWeb = require("tronweb");

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});
export class Tron {
  async signTransaction(transaction: any, privateKeyHex: string): Promise<any> {
    const signedTx = await tronWeb.trx.sign(transaction, privateKeyHex);

    return signedTx;
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
