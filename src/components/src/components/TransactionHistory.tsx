import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

const TREASURY_ADDRESS = "4d9CvPEzCqiv8A8E49CBLCx7HBi4XCax1T92kcj5Gx8P";

const TransactionHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const connection = new Connection("https://api.devnet.solana.com");
      const signatures = await connection.getSignaturesForAddress(new PublicKey(TREASURY_ADDRESS), { limit: 5 });
      setHistory(signatures);
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md">
      <h3 className="text-emerald-500 font-sans text-[10px] uppercase tracking-[0.3em] mb-4 text-center">Recent Capital Injections</h3>
      <div className="space-y-3">
        {history.map((tx, i) => (
          <div key={i} className="flex justify-between items-center text-[11px] font-sans opacity-70 border-b border-white/5 pb-2">
            <span className="text-white/80">Wallet: {tx.signature.slice(0, 6)}...</span>
            <span className="text-emerald-400">Confirmed</span>
            <a href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`} target="_blank" className="underline italic">Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;