import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";

const MINT_ADDRESS = "ZPoJxBmpfx9XUgEShitnHnJXSsfR8m5AojNDTcXvudz";

const HoldersList = () => {
  const [holders, setHolders] = useState([]);

  useEffect(() => {
    const fetchHolders = async () => {
      const connection = new Connection("https://api.devnet.solana.com");
      const accounts = await connection.getTokenLargestAccounts(new PublicKey(MINT_ADDRESS));
      setHolders(accounts.value.slice(0, 5)); // Ambil 5 pemegang terbesar
    };
    fetchHolders();
  }, []);

  return (
    <div className="mt-12 p-8 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
      <h3 className="text-white font-serif text-xl mb-6 text-center">Equity Holders</h3>
      <div className="grid gap-4">
        {holders.map((holder, index) => (
          <div key={index} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
            <span className="text-[10px] text-muted-foreground font-sans">Shareholder #{index + 1}</span>
            <span className="text-xs text-white font-mono">{holder.address.toBase58().slice(0, 8)}...</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoldersList;