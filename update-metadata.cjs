const { Connection, clusterApiUrl, Keypair, PublicKey } = require('@solana/web3.js');
const { Metaplex, keypairIdentity, bundlrStorage } = require('@metaplex-foundation/js');
const fs = require('fs');

async function main() {
    // 1. Setup Koneksi & Wallet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('./rtc_wallet.json', 'utf8')));
    const wallet = Keypair.fromSecretKey(secretKey);

    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(wallet));

    // 2. Alamat Mint Token $RTC Anda
    const mintAddress = new PublicKey("ZPoJxBmpfx9XUgEShitnHnJXSsfR8m5AojNDTcXvudz");

    // 3. Load Metadata Baru dari metadata.json
    const metadataContent = JSON.parse(fs.readFileSync('./metadata.json', 'utf8'));

    console.log("Mengambil data token dari blockchain...");
    
    try {
        const nft = await metaplex.nfts().findByMint({ mintAddress });

        console.log("Memperbarui Metadata ke RWA Model (50/50)...");
        
        await metaplex.nfts().update({
            nftOrSft: nft,
            name: metadataContent.name,
            symbol: metadataContent.symbol,
            uri: metadataContent.image, // Menggunakan link GitHub Anda
            sellerFeeBasisPoints: 0,
        });

        console.log("✅ SUCCESS: Metadata Rothschild Capital telah diperbarui!");
        console.log("Cek di: https://explorer.solana.com/address/ZPoJxBmpfx9XUgEShitnHnJXSsfR8m5AojNDTcXvudz?cluster=devnet");
    } catch (error) {
        console.error("❌ Gagal memperbarui metadata:", error.message);
    }
}

main();
