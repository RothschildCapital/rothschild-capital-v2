const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, transfer } = require('@solana/spl-token');
const fs = require('fs');

// Koneksi ke Jaringan
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Konfigurasi Rothschild Capital
const TREASURY_PUBKEY = new PublicKey("4d9CvPEzCqiv8A8E49CBLCx7HBi4XCax1T92kcj5Gx8P");
const RTC_MINT = new PublicKey("ZPoJxBmpfx9XUgEShitnHnJXSsfR8m5AojNDTcXvudz");
const RATE = 5000; // 1 SOL = 5000 $RTC

// Load Kunci Rahasia Anda (Authority)
const secretKey = new Uint8Array(JSON.parse(fs.readFileSync('./rtc_wallet.json', 'utf-8')));
const fromWallet = Keypair.fromSecretKey(secretKey);

console.log("Sistem Pengiriman Otomatis Rothschild Capital AKTIF...");

// Fungsi Memantau Transaksi Masuk
connection.onLogs(TREASURY_PUBKEY, async (logs) => {
    if (logs.err) return;
    
    console.log("Aktivitas terdeteksi di Treasury, mengecek investasi...");
    
    try {
        const signatures = await connection.getSignaturesForAddress(TREASURY_PUBKEY, { limit: 1 });
        const lastTx = await connection.getParsedTransaction(signatures[0].signature, "confirmed");
        
        // Ambil alamat pengirim dan jumlah SOL
        const sender = lastTx.transaction.message.accountKeys[0].pubkey;
        const amountSol = (lastTx.meta.postBalances[1] - lastTx.meta.preBalances[1]) / 1e9;

        if (amountSol > 0) {
            const tokenAmount = amountSol * RATE;
            console.log(`Menerima ${amountSol} SOL dari ${sender.toBase58()}. Mengirim ${tokenAmount} $RTC...`);
            
            // Proses Kirim Token $RTC
            const fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, RTC_MINT, fromWallet.publicKey);
            const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, RTC_MINT, sender);

            await transfer(
                connection,
                fromWallet,
                fromTokenAccount.address,
                toTokenAccount.address,
                fromWallet.publicKey,
                tokenAmount * 1e9 // Sesuaikan dengan desimal token Anda
            );
            
            console.log("✅ Berhasil! Token $RTC telah terkirim otomatis.");
        }
    } catch (err) {
        console.error("Gagal memproses transaksi:", err);
    }
}, "confirmed");
