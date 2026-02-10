import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey } from "@solana/web3.js";
import HeroSection from "@/components/HeroSection";
import PresaleProgress from "@/components/PresaleProgress";
import InvestmentForm from "@/components/InvestmentForm";
import TokenomicsSection from "@/components/TokenomicsSection";

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
      } catch (e) { console.error(e); }
    };
    fetchData();
  }, [connected, publicKey]);

  useEffect(() => {
    if (connected && view === 'landing') setView('menu');
  }, [connected, view]);

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-[#0F172A] font-sans selection:bg-emerald-100">
      {/* Soft Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none" />

      {/* Persistent Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('menu')}>
          <img src={LOGO_URL} alt="RTC" className="w-8 h-8 object-contain" />
          <span className="font-serif tracking-[0.2em] uppercase text-sm font-bold">Rothschild</span>
        </div>
        <div className="flex items-center gap-4">
          {connected && (
            <div className="hidden sm:block px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tighter">
                {rtcBalance.toLocaleString()} $RTC
              </span>
            </div>
          )}
          <WalletMultiButton className="!bg-slate-900 hover:!bg-emerald-600 !rounded-full !text-[9px] !uppercase !tracking-widest !h-10 transition-all shadow-xl shadow-slate-200" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.section key="landing" className="h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
            <motion.img initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} src={LOGO_URL} className="w-44 h-44 mb-12 drop-shadow-2xl" />
            <h1 className="text-6xl md:text-8xl font-light tracking-[0.3em] uppercase italic">Rothschild</h1>
            <p className="text-[11px] tracking-[0.6em] uppercase text-emerald-600 font-bold mt-6 opacity-80">Private Wealth Management</p>
            <div className="mt-16">
               <WalletMultiButton className="!bg-emerald-600 !px-12 !py-6 !rounded-full !text-[11px] !uppercase !tracking-[0.3em] shadow-2xl shadow-emerald-200 hover:scale-105 transition-transform" />
            </div>
          </motion.section>
        )}

        {view === 'menu' && (
          <motion.section key="menu" className="min-h-screen flex flex-col items-center justify-center p-6 pt-32">
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
              <MenuCard title="Presale" desc="Direct Equity Contribution" onClick={() => setView('presale')} />
              <MenuCard title="Exchange" desc="Liquidity Access Point" onClick={() => setView('dex')} />
              <MenuCard title="Dividends" desc="Asset Performance Yield" onClick={() => setView('dividend')} />
            </div>
            <p className="mt-20 text-[9px] uppercase tracking-[0.8em] text-slate-300">Rothschild Capital Group © 2026</p>
          </motion.section>
        )}

        {view === 'presale' && (
          <motion.section key="presale" className="py-32 px-6 max-w-5xl mx-auto">
             <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.02)] p-12 md:p-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                <HeroSection />
                <div className="my-16 h-px bg-slate-50" />
                <PresaleProgress />
                <InvestmentForm />
             </div>
             <TokenomicsSection />
          </motion.section>
        )}

        {/* Sections for DEX & Dividend remain clean and minimal */}
        {view === 'dex' && (
          <motion.section key="dex" className="h-screen flex flex-col items-center justify-center">
            <h2 className="text-4xl font-light uppercase tracking-widest mb-4">Trading Terminal</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.5em]">Mainnet Deployment Scheduled Post-Presale</p>
          </motion.section>
        )}

        {view === 'dividend' && (
          <motion.section key="dividend" className="h-screen flex flex-col items-center justify-center">
             <div className="p-20 bg-emerald-50/30 rounded-[4rem] border border-emerald-100/50 text-center max-w-2xl">
                <h2 className="text-5xl font-light uppercase tracking-tighter mb-6 italic">Yield Genesis</h2>
                <div className="w-12 h-1 bg-emerald-500 mx-auto mb-8" />
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-loose">Infrastructure Revenue Sharing: Bekasi Hospital & School Fund</p>
             </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

const MenuCard = ({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) => (
  <button onClick={onClick} className="group p-12 rounded-[3.5rem] bg-white border border-slate-100 hover:border-emerald-200 transition-all text-left shadow-sm hover:shadow-2xl hover:shadow-emerald-100">
    <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all">
       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-white" />
    </div>
    <h3 className="text-2xl font-serif text-slate-900 mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">{desc}</p>
  </button>
);

export default Index;
