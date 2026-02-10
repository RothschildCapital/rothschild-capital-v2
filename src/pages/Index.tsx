import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey } from "@solana/web3.js";
import HeroSection from "@/components/HeroSection";
import PresaleProgress from "@/components/PresaleProgress";
import InvestmentForm from "@/components/InvestmentForm";
import TokenomicsSection from "@/components/TokenomicsSection";

// KONFIGURASI RESMI ROTHSCHILD CAPITAL
const MINT_ADDRESS = "J1j1dfJDHvwNQCBYo6LmMpMap1mmPz123X1HALiMJerb";
const TREASURY_ADDRESS = "Dt8RUvpCThWsVqbPvRKRUmqkw3wjaKRKDjnwj7roYgUT";
const LOGO_URL = "https://raw.githubusercontent.com/RothschildCapital/rothschild-capital-metadata/main/RothschildCapital.png";

const Index = () => {
  const [view, setView] = useState<'landing' | 'menu' | 'presale' | 'dex' | 'dividend'>('landing');
  const { publicKey, connected } = useWallet();
  const [rtcBalance, setRtcBalance] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
        if (connected && publicKey) {
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            mint: new PublicKey(MINT_ADDRESS)
          });
          if (tokenAccounts.value.length > 0) {
            setRtcBalance(tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount);
          }
        }
      } catch (e) {
        console.error("Blockchain Sync Error:", e);
      }
    };
    fetchData();
  }, [connected, publicKey]);

  useEffect(() => {
    if (connected && view === 'landing') setView('menu');
  }, [connected, view]);

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#1e293b] relative overflow-hidden font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Soft Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] pointer-events-none opacity-40" />

      {/* Header Navigation */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
        {connected && (
          <div className="bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-emerald-100 px-6 py-2 rounded-full hidden md:block">
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-bold">
              Portfolio: <span className="text-slate-900">{rtcBalance.toLocaleString()} $RTC</span>
            </p>
          </div>
        )}
        <WalletMultiButton className="!bg-emerald-600 hover:!bg-emerald-700 !rounded-full !text-[9px] !uppercase !tracking-widest !transition-all !border-none !shadow-lg !shadow-emerald-200" />
      </div>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.section key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={LOGO_URL}
              alt="Rothschild Capital" 
              className="w-40 h-40 mb-10 drop-shadow-[0_20px_50px_rgba(16,185,129,0.2)]"
            />
            <h1 className="text-5xl md:text-7xl tracking-[0.4em] uppercase text-slate-900 font-light italic">Rothschild</h1>
            <p className="text-[11px] tracking-[0.6em] uppercase text-emerald-600 mt-6 font-bold">Sovereign Wealth Infrastructure</p>
            <div className="mt-20">
              <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-8 font-sans font-medium">Identity Authentication Required</p>
              <WalletMultiButton className="!bg-white !border !border-emerald-200 !text-emerald-700 !px-16 !py-7 !rounded-full !text-[11px] !uppercase !tracking-[0.4em] hover:!bg-emerald-50 transition-all shadow-sm" />
            </div>
          </motion.section>
        )}

        {view === 'menu' && (
          <motion.section key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FAFAFA]">
            <img src={LOGO_URL} alt="Logo" className="w-24 h-24 mb-16 opacity-80" />
            <div className="grid md:grid-cols-3 gap-10 w-full max-w-6xl">
              <MenuCard title="Equity Presale" desc="Asset Acquisition & Funding" onClick={() => setView('presale')} />
              <MenuCard title="Liquidity DEX" desc="Terminal Trading Interface" onClick={() => setView('dex')} />
              <MenuCard title="Yield Dividend" desc="Infrastructure Profit Sharing" onClick={() => setView('dividend')} />
            </div>
            <div className="mt-24 text-center">
              <p className="text-[9px] uppercase tracking-[0.8em] text-slate-300 font-medium">Rothschild Capital Management © 2026</p>
            </div>
          </motion.section>
        )}

        {view === 'presale' && (
          <motion.section key="presale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 relative z-10 max-w-5xl mx-auto">
            <div className="mb-16">
              <button onClick={() => setView('menu')} className="text-[10px] uppercase tracking-widest text-emerald-600 border border-emerald-100 bg-white px-10 py-4 rounded-full hover:bg-emerald-50 transition-all shadow-sm">← Back to Portal</button>
            </div>
            
            <div className="bg-white shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-slate-100 p-10 md:p-20 rounded-[4rem]">
                <HeroSection />
                <div className="h-px w-full bg-slate-100 my-16" />
                <PresaleProgress />
                <InvestmentForm />
            </div>
            
            <TokenomicsSection />
          </motion.section>
        )}

        {/* DEX and Dividend remain simple for this theme */}
        {view === 'dex' && (
          <motion.section key="dex" className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white">
            <button onClick={() => setView('menu')} className="mb-12 text-[10px] text-emerald-600 uppercase tracking-widest border border-emerald-100 px-8 py-3 rounded-full">← Return</button>
            <h3 className="text-3xl font-light uppercase tracking-[0.3em] mb-4 text-slate-800">Exchange Terminal</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Mainnet-Beta Liquidity Deployment Pending</p>
          </motion.section>
        )}

        {view === 'dividend' && (
          <motion.section key="dividend" className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white">
            <button onClick={() => setView('menu')} className="mb-12 text-[10px] text-emerald-600 uppercase tracking-widest border border-emerald-100 px-8 py-3 rounded-full">← Return</button>
            <div className="bg-[#fcfcfc] border border-slate-100 p-20 rounded-[5rem] max-w-3xl w-full">
                <h3 className="text-5xl font-light text-slate-900 uppercase tracking-[0.2em] mb-6 italic">Yield Genesis</h3>
                <p className="text-emerald-600 text-[10px] uppercase tracking-[0.5em] mb-12 font-bold">Quarterly Distribution System</p>
                <div className="h-px w-20 bg-emerald-200 mx-auto" />
                <p className="mt-12 text-[9px] uppercase tracking-widest text-slate-400">Status: Auditing Infrastructure Revenue</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

const MenuCard = ({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) => (
  <button onClick={onClick} className="p-14 rounded-[3.5rem] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.1)] hover:border-emerald-200 transition-all text-left group">
    <div className="h-2 w-2 rounded-full bg-emerald-500 mb-10 group-hover:scale-150 transition-transform" />
    <h3 className="text-2xl mb-4 uppercase tracking-[0.2em] font-serif text-slate-800">{title}</h3>
    <p className="text-[10px] text-slate-400 font-sans leading-relaxed tracking-[0.1em] uppercase">{desc}</p>
  </button>
);

export default Index;
