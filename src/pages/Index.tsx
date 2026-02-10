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
    <main className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans selection:bg-emerald-100">
      {/* Navbar Tetap (Always Visible) */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-50 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('menu')}>
          <img src={LOGO_URL} alt="RTC" className="w-8 h-8 object-contain" />
          <span className="font-serif tracking-[0.2em] uppercase text-sm font-bold">Rothschild</span>
        </div>
        <div className="flex items-center gap-4">
          {connected && (
            <div className="hidden sm:block px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">
                {rtcBalance.toLocaleString()} $RTC
              </span>
            </div>
          )}
          <WalletMultiButton className="!bg-slate-900 !rounded-full !text-[9px] !uppercase !tracking-widest !h-10 transition-all shadow-lg shadow-slate-200" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.section key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex flex-col items-center justify-center text-center px-6">
            <img src={LOGO_URL} alt="Rothschild Logo" className="w-40 h-40 mb-10 drop-shadow-2xl" />
            <h1 className="text-6xl md:text-8xl font-light tracking-[0.3em] uppercase italic">Rothschild</h1>
            <p className="text-[10px] tracking-[0.6em] uppercase text-emerald-600 font-bold mt-6 opacity-80">Private Wealth Infrastructure</p>
            <div className="mt-16">
               <WalletMultiButton className="!bg-emerald-600 !px-12 !py-6 !rounded-full !text-[11px] !uppercase !tracking-[0.3em] shadow-2xl shadow-emerald-200" />
            </div>
          </motion.section>
        )}

        {view === 'menu' && (
          <motion.section key="menu" className="min-h-screen flex flex-col items-center justify-center p-6 pt-32">
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
              <MenuCard title="Equity Presale" desc="Direct Investment Terminal" onClick={() => setView('presale')} />
              <MenuCard title="Exchange" desc="Liquidity Access Point" onClick={() => setView('dex')} />
              <MenuCard title="Dividends" desc="Asset Performance Yield" onClick={() => setView('dividend')} />
            </div>
          </motion.section>
        )}

        {view === 'presale' && (
          <motion.section key="presale" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-32 px-6 max-w-5xl mx-auto">
             <button onClick={() => setView('menu')} className="mb-12 text-[10px] uppercase tracking-widest text-emerald-600 flex items-center gap-2 font-bold">
               ← Back to Portal
             </button>

             {/* KOTAK PRESALE YANG DIPERBAIKI */}
             <div className="bg-white rounded-[4rem] border border-slate-100 shadow-[0_40px_80px_rgba(0,0,0,0.03)] p-10 md:p-20 relative overflow-hidden">
                <div className="flex flex-col items-center text-center mb-16">
                    <img src={LOGO_URL} alt="Rothschild Logo" className="w-24 h-24 mb-6" />
                    <h2 className="text-4xl font-serif uppercase tracking-widest text-slate-900">Official Presale</h2>
                    <div className="w-12 h-1 bg-emerald-500 mt-4" />
                </div>
                
                <div className="space-y-16">
                  <HeroSection />
                  <div className="h-px bg-slate-50" />
                  <PresaleProgress />
                  <div className="bg-[#FAFAFA] p-8 md:p-12 rounded-[3rem] border border-slate-50">
                    <InvestmentForm />
                  </div>
                </div>
             </div>
             
             <div className="mt-12">
               <TokenomicsSection />
             </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

const MenuCard = ({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) => (
  <button onClick={onClick} className="group p-12 rounded-[4rem] bg-white border border-slate-100 hover:border-emerald-200 transition-all text-left shadow-sm hover:shadow-2xl hover:shadow-emerald-100">
    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all">
       <span className="text-xs">→</span>
    </div>
    <h3 className="text-2xl font-serif text-slate-900 mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{desc}</p>
  </button>
);

export default Index;
