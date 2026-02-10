import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const TREASURY_ADDRESS = "4d9CvPEzCqiv8A8E49CBLCx7HBi4XCax1T92kcj5Gx8P";
const GOAL = 1000;

const PresaleProgress = () => {
  const [raised, setRaised] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        const publicKey = new PublicKey(TREASURY_ADDRESS);
        const balance = await connection.getBalance(publicKey);
        setRaised(balance / LAMPORTS_PER_SOL);
      } catch (e) {
        console.error("Gagal mengambil saldo organik", e);
      }
    };

    fetchBalance();
    const id = setInterval(fetchBalance, 30000); // Update otomatis setiap 30 detik
    return () => clearInterval(id);
  }, []);

  const percent = Math.min((raised / GOAL) * 100, 100);

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-end mb-2">
        <div className="space-y-1">
          <p className="text-[10px] tracking-[0.3em] uppercase text-emerald-500 font-bold">Live Treasury</p>
          <h3 className="text-4xl font-serif text-white">{raised.toFixed(2)} <span className="text-sm text-white/30">SOL</span></h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold">Progress</p>
          <h3 className="text-4xl font-serif text-white">{percent.toFixed(1)}%</h3>
        </div>
      </div>

      {/* Bar Organik dengan Efek Glow Emerald */}
      <div className="relative h-4 rounded-full bg-black/50 p-[2px] border border-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-800 via-emerald-400 to-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        />
      </div>

      {/* RWA Breakdown 50/50 */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-emerald-500/60 font-bold">Business Equity (50%)</p>
          <p className="text-sm text-white/90">{(raised * 0.5).toFixed(2)} SOL</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Liquidity Pool (50%)</p>
          <p className="text-sm text-white/90">{(raised * 0.5).toFixed(2)} SOL</p>
        </div>
      </div>
    </div>
  );
};

export default PresaleProgress;