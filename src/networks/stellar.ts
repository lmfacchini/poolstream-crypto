import { Keypair, TransactionBuilder } from "@stellar/stellar-sdk";
import { Blockchain, Wallet } from "./blockchain";

export class Stellar implements Blockchain {
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
    serializedTransaction: any,
    secret: string,
    options: any = { networkPassphrase: "" }
  ): Promise<any> {
    const transaction = TransactionBuilder.fromXDR(
      serializedTransaction as string,
      options.networkPassphrase
    );
    const keypair = Keypair.fromSecret(secret);

    transaction.sign(keypair);

    const signedSerializedTx = transaction.toXDR();

    return signedSerializedTx;
  }
}
