import { Networks } from "@stellar/stellar-sdk";

export interface Blockchain<T extends SignableTransaction, S> {
  generateWallet(): Promise<Wallet>;
  signTransaction(transactions: T, secret: S): Promise<T>;
}

export interface SignableTransaction {
  natural: any;
  label: string;
  [key: string]: any;
}

export interface Wallet {
  secret: string;
  address: string;
  raw: any;
}

export interface StellarSignableTransaction extends SignableTransaction {
  networkPassphrase: Networks;
}
