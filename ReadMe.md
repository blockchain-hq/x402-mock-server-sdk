# x402 Server SDK

Server-side SDK for the x402 payment protocol on Solana. Return HTTP 402 responses and verify SOL payments.

[![npm version](https://badge.fury.io/js/x402-server-sdk.svg)](https://www.npmjs.com/package/x402-server-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Features

- ✅ Return 402 Payment Required responses
- ✅ Verify SOL payments on-chain
- ✅ Prevent replay attacks
- ✅ Devnet & Mainnet support
- ✅ TypeScript support

## 📦 Installation

```bash
npm install x402-server-sdk
```

## 🚀 Quick Start

```typescript
import { SolanaX402Server } from 'x402-server-sdk';

const server = new SolanaX402Server({
  network: 'devnet',
  recipientAddress: 'YOUR_WALLET_ADDRESS',
});

await server.initialize();

// Return 402 when payment needed
app.get('/premium', async (req, res) => {
  const payment = req.headers['x-payment'];
  
  if (!payment) {
    const response402 = await server.create402Response(0.01);
    return res.status(402).json(response402.body);
  }
  
  // Verify payment
  const verification = await server.verifyPayment(payment, 0.01);
  
  if (verification.valid) {
    res.json({ content: 'Premium content!' });
  } else {
    res.status(403).json({ error: verification.error });
  }
});
```

## 📖 API

### Constructor

```typescript
new SolanaX402Server({
  network: 'devnet' | 'mainnet-beta',
  recipientAddress: string,
  rpcUrl?: string
})
```

### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `initialize()` | Initialize server | `Promise<void>` |
| `create402Response(amount, resourceId?)` | Create 402 response | `Promise<X402Response>` |
| `verifyPayment(signature, amount, maxAge?)` | Verify payment | `Promise<PaymentVerification>` |
| `getRecipientBalance()` | Get wallet balance | `Promise<number>` |

## 🔒 Security

```typescript
// Set max age to prevent replay attacks
const verification = await server.verifyPayment(
  signature,
  0.01,
  300 // 5 minutes max
);

// Store used signatures in database
if (await db.isSignatureUsed(signature)) {
  return res.status(403).json({ error: 'Payment already used' });
}
```

## 🌐 Networks

**Devnet:**
```typescript
const server = new SolanaX402Server({
  network: 'devnet',
  recipientAddress: 'YOUR_DEVNET_WALLET',
});
```

**Mainnet:**
```typescript
const server = new SolanaX402Server({
  network: 'mainnet-beta',
  recipientAddress: 'YOUR_MAINNET_WALLET',
});
```

## 📚 Documentation

Full documentation: [docs.x402.org](https://docs.x402.org)

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| Transaction not found | Wait a few seconds, check network |
| Amount mismatch | Verify exact amount (tolerance: 0.0001 SOL) |
| Transaction too old | Increase maxAge or get new payment |
| Recipient not found | Verify wallet address and network |

## 📄 License

MIT

## 🤝 Contributing

Issues and PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 💬 Support

- [GitHub Issues](https://github.com/YOUR_USERNAME/x402-server-sdk/issues)
- [Discord](https://discord.gg/YOUR_DISCORD)

---

Made with ❤️ for Solana