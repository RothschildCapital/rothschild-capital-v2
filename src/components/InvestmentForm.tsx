import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { toast } from "sonner";
import { TREASURY_ADDRESS } from "@/contexts/WalletContext";

const RATE = 5000; // 1 SOL = 5,000 RTC

const InvestmentForm = () => {
  const [solAmount, setSolAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();

  const rtcAmount = solAmount ? (parseFloat(solAmount) * RATE).toLocaleString() : "0";

  const handleBuy = async () => {
    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }

    const amount = parseFloat(solAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid SOL amount");
      return;
    }

    if (amount < 0.01) {
      toast.error("Minimum investment is 0.01 SOL");
      return;
    }

    if (amount > 1000) {
      toast.error("Maximum investment is 1,000 SOL per transaction");
      return;
    }

    setLoading(true);

    try {
      const treasuryPubkey = new PublicKey(TREASURY_ADDRESS);
      const lamports = Math.round(amount * LAMPORTS_PER_SOL);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: treasuryPubkey,
          lamports,
        })
      );

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);

      toast.loading("Confirming transaction on Devnet...", { id: "tx" });

      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "confirmed"
      );

      toast.success(
        `Successfully purchased ${(amount * RATE).toLocaleString()} $RTC!`,
        { id: "tx" }
      );
      setSolAmount("");
    } catch (error: any) {
      console.error("Transaction failed:", error);
      if (error?.message?.includes("User rejected")) {
        toast.error("Transaction cancelled", { id: "tx" });
      } else {
        toast.error("Transaction failed. Please try again.", { id: "tx" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto p-8 rounded-sm border border-border bg-card glow-gold"
    >
      <h3 className="font-heading text-xl tracking-[0.1em] text-center mb-2 text-gold-gradient">
        Invest in $RTC
      </h3>
      <p className="text-center text-muted-foreground font-body text-sm mb-6">
        Total Supply: 100,000,000 $RTC
      </p>

      <div className="space-y-4">
        {/* SOL Input */}
        <div className="space-y-2">
          <label className="font-heading text-xs tracking-[0.15em] uppercase text-muted-foreground">
            You Pay (SOL)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.01"
              max="1000"
              step="0.01"
              placeholder="0.00"
              value={solAmount}
              onChange={(e) => setSolAmount(e.target.value)}
              disabled={loading}
              className="w-full bg-secondary border border-border rounded-sm px-4 py-3 font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-heading text-xs tracking-widest text-primary">
              SOL
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-primary text-lg">⇣</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* RTC Output */}
        <div className="space-y-2">
          <label className="font-heading text-xs tracking-[0.15em] uppercase text-muted-foreground">
            You Receive ($RTC)
          </label>
          <div className="relative">
            <div className="w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 font-body text-lg text-foreground">
              {rtcAmount}
            </div>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-heading text-xs tracking-widest text-primary">
              RTC
            </span>
          </div>
        </div>

        <div className="p-3 rounded-sm bg-secondary/30 border border-border">
          <p className="text-center text-primary font-heading text-sm tracking-wider">
            1 SOL = {RATE.toLocaleString()} $RTC
          </p>
        </div>

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          onClick={handleBuy}
          disabled={loading}
          className="w-full py-4 bg-gold-gradient text-primary-foreground font-heading text-sm tracking-[0.2em] uppercase rounded-sm shimmer transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : connected ? "Buy $RTC" : "Connect Wallet to Buy"}
        </motion.button>

        {connected && publicKey && (
          <p className="text-center text-muted-foreground font-body text-xs">
            Connected: {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-4)}
          </p>
        )}

        <p className="text-center text-muted-foreground/60 font-body text-xs">
          Network: Solana Devnet
        </p>
      </div>
    </motion.div>
  );
};

export default InvestmentForm;
