const { Connection, Keypair, PublicKey, clusterApiUrl, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, createTransferInstruction } = require('@solana/spl-token');
const fs = require('fs');

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Load Wallet Legion
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('/home/muhammadjefry/.config/solana/id.json', 'utf8')));
const fromWallet = Keypair.fromSecretKey(secretKey);
const mintAddress = new PublicKey("ZPoJxBmpfx9XUgEShitnHnJXSsfR8m5AojNDTcXvudz");

console.log("🚀 Sistem Pengiriman Otomatis RTC Aktif...");

async function sendToken(toAddress, amount) {
    try {
        const toPublicKey = new PublicKey(toAddress);
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mintAddress, fromWallet.publicKey);
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mintAddress, toPublicKey);

        const transaction = new Transaction().add(
            createTransferInstruction(fromTokenAccount.address, toTokenAccount.address, fromWallet.publicKey, amount * 10 ** 9)
        );

        const signature = await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
        console.log(`✅ Berhasil! 50 $RTC terkirim ke ${toAddress}. Sig: ${signature.substring(0,10)}`);
    } catch (e) {
        console.error("❌ Gagal kirim token:", e.message);
    }
}

// Pantau Transaksi Masuk (0.01 SOL)
connection.onLogs(fromWallet.publicKey, (logs) => {
    if (logs.err) return;
    console.log("🔍 Aktivitas terdeteksi di Treasury...");
    // Logika deteksi transfer SOL bisa diperdalam di sini sesuai kebutuhan log
    // Untuk demo/testing, kita asumsikan setiap log masuk adalah trigger
}, 'confirmed');

// Simulasi Loop Checker (Setiap 30 detik cek signature terbaru)
setInterval(async () => {
    const signatures = await connection.getSignaturesForAddress(fromWallet.publicKey, { limit: 1 });
    if (signatures.length > 0) {
        console.log("💰 Cek transaksi terakhir...");
    }
}, 30000);
