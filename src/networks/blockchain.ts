export interface Blockchain {
  generateWallet(): Promise<Wallet>;
  signTransaction(
    serializedTransaction: any,
    secret: string,
    options: any
  ): Promise<any>;
}

export interface Wallet {
  secret: string;
  address: string;
  raw: any;
}
