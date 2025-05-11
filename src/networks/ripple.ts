import { Blockchain, SignableTransaction, Wallet } from "./blockchain";

import { deriveAddress, deriveKeypair, generateSeed } from "ripple-keypairs";
import { RippleWallet } from "./ripple.types";

export class Ripple implements Blockchain<SignableTransaction, string> {
  async generateWallet(): Promise<Wallet> {
    const seed = generateSeed();

    const keypair = deriveKeypair(seed);

    const classicAddress = deriveAddress(keypair.publicKey);

    return {
      secret: keypair.privateKey,
      address: classicAddress,
      raw: { seed },
    };
  }

  async signTransaction(
    transaction: SignableTransaction,
    secret: string
  ): Promise<SignableTransaction> {
    const wallet = RippleWallet.fromSeed(secret);
    transaction.natural = wallet.sign(transaction.natural);
    return transaction;
  }
}
