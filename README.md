# @poolstream/crypto

**A lightweight and secure library for generating wallets and signing cryptocurrency transactions.**  
Built for self-custody, multi-chain compatibility, and developer flexibility.

## 📚 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
  - [Generate Wallet](#generate-wallet)
  - [Sign Transaction](#sign-transaction)
  - [Raw Node.Js](#raw-nodejs)
- [Supported Blockchains](#-supported-blockchains)
- [Security Notes](#-security-notes)
- [Documentation](#-documentation)
- [License](#-license)
- [Contributing](#-contributing)

## ✨ Features

- 🔐 Generate deterministic or random wallets
- 📝 Sign transactions securely
- 🌐 Multi-chain support (Ripple, Tron, Stellar, etc.)
- 📦 Minimal dependencies, fast install
- ✅ Works in Node.js environments
- 🔒 Designed for self-custodial apps (you keep the keys)

## 🚀 Installation

```bash
npm install @poolstream/crypto
# or
yarn add @poolstream/crypto
```

## 📦 Usage

### Generate Wallet

```typescript
import { Ripple } from "@poolstream/crypto";

let ripple = new Ripple();
let wallet = await ripple.generateWallet();

console.log(`Secret or private key: [${wallet.secret}]`);
console.log(`Wallet address: [${wallet.address}]`);
```

### Sign Transaction

```typescript
import { Ripple } from "@poolstream/crypto";

let ripple = new Ripple();

let naturalTransaction = {
  TransactionType: "Payment",
  Account: "...",
  Destination: "...",
  Amount: "1000000",
  Fee: "10",
  Sequence: 1,
  // etc.
};

let secret = "...";

let signedTransaction = await ripple.signTransaction(
  naturalTransaction,
  secret
);

console.log(signedTransaction);
```

### Raw Node.Js

```javascript
const crypto = require("@poolstream/crypto");
const ripple = new crypto.Ripple;
console.log(ripple.generateWallet());
```

## 🌍 Supported Blockchains

The API design is extensible and provides a common interface for all supported blockchains:

- ✅ Ripple (XRP Ledger)
- ✅ Stellar
- ✅ Tron
- 🚧 Ethereum (in progress)
- 🚧 Bitcoin (planned)
- ✅ Custom transaction builders supported

## 🔒 Security Notes

- This library is designed for offline usage and does not make any network requests.
- Your private keys never leave your environment.
- You are fully responsible for key management and secure storage.

## 📚 Documentation

📘 Full documentation and API reference:  
https://poolstream.io/docs

## 📄 License

This project is licensed under the GNU General Public License MIT.  
See the LICENSE file for more details.

## 🤝 Contributing

Contributions, improvements, and bug reports are welcome!  
Feel free to open an issue or submit a pull request.

---

Made with ❤️ by [PoolStream.io](https://poolstream.io)
