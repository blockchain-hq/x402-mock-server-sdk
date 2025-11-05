import express, { Request, Response } from 'express';
import { SolanaX402Server } from './server';

const app = express();
const PORT = 3000;

// Your wallet
const YOUR_WALLET = '8qEoLvRsumJpNCn7Q5PT19W5X5g62TKjCaMBDVBpu1hr';

// Initialize x402 server
const x402 = new SolanaX402Server({
  network: 'devnet',
  recipientAddress: YOUR_WALLET,
});

x402.initialize().then(() => console.log('✅ Ready\n'));

// Return 402 requiring SOL payment
app.get('/protected', async (req: Request, res: Response) => {
  const payment402 = await x402.create402Response(0.01); // 0.01 SOL
  
  res.status(402)
     .set(payment402.headers)
     .json(payment402.body);
});

app.listen(PORT, () => {
  console.log(`
🚀 Server running: http://localhost:${PORT}

Test it:
  curl -v http://localhost:${PORT}/protected

Expected: 402 Payment Required (0.01 SOL)
  `);
});