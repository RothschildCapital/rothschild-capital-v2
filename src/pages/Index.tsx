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
const LOGO_URL = "https://raw.githubusercontent.com/RothschildCapital/rothschild-capital-metadata/main/RothschildCapital.png";

const Index = () => {
  const [view, setView] = useState<'landing' | 'menu' | 'presale' | 'dex' | 'dividend'>('landing');
  const { publicKey, connected } = useWallet();
  const [rtcBalance, setRtcBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
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
    fetchBalance();
  }, [connected, publicKey]);

  useEffect(() => {
    if (connected && view === 'landing') setView('menu');
  }, [connected, view]);

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans overflow-x-hidden">
      {/* Premium Subtle Gradient Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/40 via-transparent to-transparent pointer-events-none" />

      {/* Luxury Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-50 px-6 md:px-12 py-5 flex justify-between items-center transition-all">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('menu')}>
          <div className="w-10 h-10 bg-slate-50 rounded-xl p-1.5 border border-slate-100 group-hover:border-emerald-200 transition-all">
            <img src={LOGO_URL} alt="RTC" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.3em] uppercase text-sm font-bold text-slate-900">Rothschild</span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-emerald-600 font-bold -mt-0.5">Capital Management</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {connected && (
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Authenticated Asset</span>
              <span className="text-xs font-bold text-emerald-600">{rtcBalance.toLocaleString()} $RTC</span>
            </div>
          )}
          <WalletMultiButton className="!bg-slate-900 hover:!bg-emerald-600 !rounded-full !text-[9px] !uppercase !tracking-[0.2em] !h-11 !px-8 !transition-all !border-none shadow-xl shadow-slate-200" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.section key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.8 }} className="relative">
              <img src={LOGO_URL} alt="Rothschild Logo" className="w-48 h-48 mb-12 drop-shadow-[0_35px_35px_rgba(16,185,129,0.15)] mx-auto" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-light tracking-[0.4em] uppercase text-slate-900 mb-6 italic">Rothschild</h1>
            <p className="max-w-2xl text-[10px] md:text-[12px] tracking-[0.6em] uppercase text-slate-400 font-medium mb-16 leading-relaxed">
              Global Infrastructure & Healthcare Equity Settlement
            </p>
            <WalletMultiButton className="!bg-emerald-600 !px-16 !py-8 !rounded-full !text-[11px] !uppercase !tracking-[0.4em] shadow-2xl shadow-emerald-200 hover:!scale-105 transition-transform" />
          </motion.section>
        )}

        {view === 'menu' && (
          <motion.section key="menu" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex flex-col items-center justify-center p-6 pt-32">
            <div className="grid lg:grid-cols-3 gap-10 w-full max-w-6xl">
              <MenuCard title="Equity Presale" desc="Acquisition of Sovereign Healthcare Assets" onClick={() => setView('presale')} />
              <MenuCard title="Trading Floor" desc="Institutional Liquidity Interface" onClick={() => setView('dex')} />
              <MenuCard title="Yield Portfolio" desc="Quarterly Dividend Distribution" onClick={() => setView('dividend')} />
            </div>
            <footer className="mt-24 opacity-30">
              <p className="text-[9px] uppercase tracking-[1em]">Excellence • Integrity • Sovereignty</p>
            </footer>
          </motion.section>
        )}

        {view === 'presale' && (
          <motion.section key="presale" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-32 px-6 max-w-5xl mx-auto">
             <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_60px_100px_rgba(0,0,0,0.02)] p-10 md:p-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16" />
                <HeroSection />
                <div className="my-20 h-px bg-slate-50" />
                <PresaleProgress />
                <InvestmentForm />
             </div>
             <TokenomicsSection />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

const MenuCard = ({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) => (
  <button onClick={onClick} className="group relative p-14 rounded-[4rem] bg-white border border-slate-100 hover:border-emerald-200 transition-all duration-500 text-left shadow-sm hover:shadow-[0_40px_80px_rgba(16,185,129,0.08)] overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-12 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
       <span className="text-xs">→</span>
    </div>
    <h3 className="text-2xl font-serif text-slate-900 mb-4 uppercase tracking-wider leading-tight">{title}</h3>
    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed opacity-70 group-hover:opacity-100">{desc}</p>
  </button>
);

export default Index;
