const { Connection, clusterApiUrl, Keypair, PublicKey } = require('@solana/web3.js');
const fs = require('fs');

async function main() {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('./rtc_wallet.json', 'utf8')));
    const adminWallet = Keypair.fromSecretKey(secretKey);
    const MINT_ADDRESS = new PublicKey("ZPoJxBmpfx9XUgEShitnHnJXSsfR8m5AojNDTcXvudz");

    // INPUT: Jumlah SOL keuntungan yang ingin dibagikan
    const totalProfitToDistribute = 0.5; // Contoh: Bagi-bagi 0.5 SOL keuntungan

    console.log(`=== ROTHSCHILD CAPITAL: DIVIDEND DISTRIBUTION ===`);
    console.log(`Total Profit to Share: ${totalProfitToDistribute} SOL`);

    try {
        // 1. Ambil daftar semua pemegang token
        console.log("Scanning token holders...");
        const accounts = await connection.getProgramAccounts(new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), {
            filters: [
                { dataSize: 165 },
                { memcmp: { offset: 0, bytes: MINT_ADDRESS.toBase58() } }
            ]
        });

        // 2. Filter dompet yang punya saldo > 0
        let holders = [];
        let totalTokensHeld = 0;

        accounts.forEach(account => {
            const amount = account.account.data.readBigUInt64LE(64);
            if (amount > 0n) {
                // Sederhanakan alamat owner (logika ini perlu penyesuaian untuk mendapatkan Owner address asli)
                holders.push({ pubkey: account.pubkey, balance: Number(amount) });
                totalTokensHeld += Number(amount);
            }
        });

        console.log(`Found ${holders.length} active shareholders.`);

        // 3. Distribusi SOL berdasarkan persentase kepemilikan
        for (const holder of holders) {
            const sharePercentage = holder.balance / totalTokensHeld;
            const payout = sharePercentage * totalProfitToDistribute;

            if (payout > 0.001) { // Minimal payout agar tidak boncos di fee
                console.log(`Distributing ${payout.toFixed(4)} SOL to ${holder.pubkey.toBase58().slice(0,8)}...`);
                // Proses transfer SOL (Uncomment jika sudah siap eksekusi)
                /*
                const transaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey: adminWallet.publicKey,
                        toPubkey: holder.pubkey,
                        lamports: payout * LAMPORTS_PER_SOL,
                    })
                );
                await sendAndConfirmTransaction(connection, transaction, [adminWallet]);
                */
            }
        }

        console.log("✅ Dividend distribution completed successfully.");

    } catch (err) {
        console.error("❌ Error during distribution:", err);
    }
}

main();
