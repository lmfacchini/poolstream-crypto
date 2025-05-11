import { Keypair, TransactionBuilder } from "@stellar/stellar-sdk";
import { Blockchain, StellarSignableTransaction, Wallet } from "./blockchain";

export class Stellar implements Blockchain<StellarSignableTransaction, string> {
  async generateWallet(): Promise<Wallet> {
    const keypair = Keypair.random();

    const publicKey = keypair.publicKey();

    const secret = keypair.secret();

    return {
      secret,
      address: publicKey,
      raw: keypair,
    };
  }

  async signTransaction(
    signableTransaction: StellarSignableTransaction,
    secret: string
  ): Promise<StellarSignableTransaction> {
    const transaction = TransactionBuilder.fromXDR(
      signableTransaction.natural as string,
      signableTransaction.networkPassphrase
    );
    const keypair = Keypair.fromSecret(secret);

    transaction.sign(keypair);

    signableTransaction.natural = transaction.toXDR();

    return signableTransaction;
  }
}
