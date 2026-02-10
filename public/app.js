const treasuryWallet = "4d9CvPEzCqiv8A8E49CBLCx7HBi4XCax1T92kcj5Gx8P";

window.addEventListener('load', () => {
    const connectBtn = document.getElementById('connectBtn');
    const buyBtn = document.getElementById('buyBtn');
    let userWallet = null;

    connectBtn.addEventListener('click', async () => {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                userWallet = response.publicKey.toString();
                connectBtn.innerText = "Terhubung: " + userWallet.slice(0,4) + "...";
                connectBtn.style.background = "#4ade80";
                console.log("Terhubung ke:", userWallet);
            } catch (err) {
                console.error("User menolak koneksi");
            }
        } else {
            alert("Harap instal Phantom Wallet!");
        }
    });

    buyBtn.addEventListener('click', async () => {
        if (!userWallet) return alert("Hubungkan dompet dulu!");
        const amount = document.getElementById('solAmount').value;
        if (!amount || amount <= 0) return alert("Masukkan jumlah SOL!");

        try {
            const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
            const transaction = new solanaWeb3.Transaction().add(
                solanaWeb3.SystemProgram.transfer({
                    fromPubkey: new solanaWeb3.PublicKey(userWallet),
                    toPubkey: new solanaWeb3.PublicKey(treasuryWallet),
                    lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
                })
            );
            const { signature } = await window.solana.signAndSendTransaction(transaction);
            await connection.confirmTransaction(signature);
            alert("Pembelian Berhasil! SOL telah dikirim.");
        } catch (err) {
            alert("Transaksi gagal.");
        }
    });
});
