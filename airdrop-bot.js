const { Connection, PublicKey, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, transfer } = require('@solana/spl-token');
const fs = require('fs');

// Konfigurasi
const RPC_URL = "https://api.devnet.solana.com";
const TREASURY_WALLET = "4d9CvPEzCqiv8A8E49CBLCx7HBi4XCax1T92kcj5Gx8P";
const RTC_MINT = new PublicKey("ZPoJxBmpfx9XUgEShitnHnJXSsfR8m5AojNDTcXvudz");
const RATIO = 5000; // 1 SOL = 5000 RTC

const connection = new Connection(RPC_URL, 'confirmed');
const secretKey = new Uint8Array(JSON.parse(fs.readFileSync('./rtc_wallet.json', 'utf-8')));
const adminKeypair = Keypair.fromSecretKey(secretKey);

console.log("=== Rothschild Capital Airdrop Bot Aktif ===");
console.log("Memantau transaksi masuk...");

async function runBot() {
    connection.onLogs(new PublicKey(TREASURY_WALLET), async (logs, ctx) => {
        if (logs.err) return;
        
        console.log("Transaksi masuk terdeteksi! Memproses...");
        // Logika pengiriman token akan mengecek signature dan jumlah SOL
        // Lalu menembakkan spl-token transfer ke pengirim
        console.log("Fitur transfer otomatis siap diaktifkan.");
    }, 'confirmed');
}

runBot();
