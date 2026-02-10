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
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/20 via-transparent to-transparent pointer-events-none" />

      {/* Luxury Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('menu')}>
          <img 
            src={LOGO_URL} 
            alt="RTC" 
            className="w-10 h-10 object-contain drop-shadow-sm"
            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=RTC"; }} 
          />
          <span className="font-serif tracking-[0.2em] uppercase text-sm font-black text-slate-900">Rothschild</span>
        </div>
        <div className="flex items-center gap-4">
          {connected && (
            <div className="hidden sm:block px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">
                {rtcBalance.toLocaleString()} $RTC
              </span>
            </div>
          )}
          <WalletMultiButton className="!bg-slate-900 !rounded-full !text-[9px] !uppercase !tracking-widest !h-10 shadow-lg" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.section key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex flex-col items-center justify-center text-center px-6">
            <div className="mb-10">
              <img 
                src={LOGO_URL} 
                alt="Logo" 
                className="w-48 h-48 mx-auto drop-shadow-2xl"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/200?text=Rothschild+Capital"; }}
              />
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-[0.2em] uppercase text-slate-900">
              ROTHSCHILD
            </h1>
            <h2 className="text-4xl md:text-6xl font-light tracking-[0.1em] uppercase text-emerald-600 mt-2">
              CAPITAL
            </h2>
            <p className="text-[11px] tracking-[0.5em] uppercase text-slate-500 font-bold mt-8">
              Sovereign Wealth Infrastructure
            </p>
            <div className="mt-16">
               <WalletMultiButton className="!bg-emerald-600 !px-16 !py-8 !rounded-full !text-[11px] !uppercase !tracking-[0.4em] shadow-2xl shadow-emerald-100 hover:scale-105 transition-transform" />
            </div>
          </motion.section>
        )}

        {view === 'menu' && (
          <motion.section key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex flex-col items-center justify-center p-6 pt-32">
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
              <MenuCard title="Equity Presale" desc="Direct Asset Contribution" onClick={() => setView('presale')} />
              <MenuCard title="DEX Exchange" desc="Secondary Market Access" onClick={() => setView('dex')} />
              <MenuCard title="Dividends" desc="Infrastructure Performance" onClick={() => setView('dividend')} />
            </div>
          </motion.section>
        )}

        {view === 'presale' && (
          <motion.section key="presale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 px-6 max-w-5xl mx-auto">
             <button onClick={() => setView('menu')} className="mb-12 text-[10px] uppercase tracking-widest text-emerald-600 flex items-center gap-2 font-bold bg-white border border-emerald-100 px-6 py-3 rounded-full shadow-sm">
               ← Back to Portal
             </button>

             <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl p-10 md:p-20 text-center">
                <div className="flex flex-col items-center mb-16">
                    <img 
                      src={LOGO_URL} 
                      className="w-32 h-32 mb-6" 
                      alt="Logo"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=RTC"; }}
                    />
                    <h2 className="text-4xl font-black uppercase tracking-widest text-slate-900">OFFICIAL PRESALE</h2>
                    <div className="w-20 h-1 bg-emerald-500 mt-4 rounded-full" />
                </div>
                
                <div className="space-y-12">
                  <div className="bg-slate-50 p-10 rounded-[3rem]">
                    <HeroSection />
                  </div>
                  <PresaleProgress />
                  <div className="bg-slate-900 p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-emerald-900/20">
                    <InvestmentForm />
                  </div>
                </div>
             </div>
             <TokenomicsSection />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

const MenuCard = ({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) => (
  <button onClick={onClick} className="group p-12 rounded-[4rem] bg-white border border-slate-100 hover:border-emerald-200 transition-all text-left shadow-sm hover:shadow-2xl">
    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-10 group-hover:bg-emerald-600 group-hover:text-white transition-all">
       <span className="font-bold">→</span>
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">{desc}</p>
  </button>
);

export default Index;
