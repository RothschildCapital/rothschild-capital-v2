// Skrip ini akan memantau SOL masuk dan mengirimkan $RTC balik ke investor
const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const fs = require('fs');

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const secretKey = new Uint8Array(JSON.parse(fs.readFileSync('./rtc_wallet.json', 'utf-8')));
const adminKeypair = Keypair.fromSecretKey(secretKey);

console.log("Monitoring Rothschild Capital Treasury...");

// Logika: Setiap ada transaksi masuk, kirim RTC
// (Gunakan library spl-token untuk eksekusi transfer)
