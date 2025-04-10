import { Blockchain, Wallet } from "./blockchain";

import { deriveAddress, deriveKeypair, generateSeed } from "ripple-keypairs";
import { RippleWallet } from "./ripple.types";

export class Ripple implements Blockchain {
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

  async signTransaction(transaction: any, secret: string): Promise<any> {
    const wallet = RippleWallet.fromSeed(secret);

    return wallet.sign(transaction);
  }
}
