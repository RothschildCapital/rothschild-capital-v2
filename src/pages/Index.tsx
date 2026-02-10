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
    <main className="min-h-screen bg-[#050505] text-[#F1F5F9] font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Deep Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Dark Luxury Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('menu')}>
          <img src={LOGO_URL} alt="RTC" className="w-9 h-9 object-contain brightness-110" />
          <span className="font-serif tracking-[0.3em] uppercase text-sm font-bold text-white">Rothschild</span>
        </div>
        <div className="flex items-center gap-4">
          {connected && (
            <div className="hidden sm:block px-4 py-1.5 bg-emerald-950/40 border border-emerald-500/20 rounded-full">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
                {rtcBalance.toLocaleString()} $RTC
              </span>
            </div>
          )}
          <WalletMultiButton className="!bg-emerald-600 hover:!bg-emerald-500 !rounded-full !text-[9px] !uppercase !tracking-widest !h-10 transition-all shadow-2xl shadow-emerald-900/20" />
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.section key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              src={LOGO_URL} 
              className="w-48 h-48 mb-12 drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]" 
            />
            <h1 className="text-6xl md:text-8xl font-light tracking-[0.4em] uppercase text-white italic">Rothschild</h1>
            <p className="text-[11px] tracking-[0.6em] uppercase text-emerald-500 font-bold mt-8">Sovereign Wealth Infrastructure</p>
            <div className="mt-20">
               <WalletMultiButton className="!bg-transparent !border !border-emerald-500/30 !text-emerald-400 !px-16 !py-7 !rounded-full !text-[11px] !uppercase !tracking-[0.4em] hover:!bg-emerald-500/10 transition-all shadow-2xl" />
            </div>
          </motion.section>
        )}

        {view === 'menu' && (
          <motion.section key="menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen flex flex-col items-center justify-center p-6 pt-32">
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
              <MenuCard title="Equity Presale" desc="Direct Asset Funding" onClick={() => setView('presale')} />
              <MenuCard title="Exchange" desc="Liquidity Interface" onClick={() => setView('dex')} />
              <MenuCard title="Dividends" desc="Infrastructure Yield" onClick={() => setView('dividend')} />
            </div>
          </motion.section>
        )}

        {view === 'presale' && (
          <motion.section key="presale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 px-6 max-w-5xl mx-auto">
             <button onClick={() => setView('menu')} className="mb-12 text-[10px] uppercase tracking-widest text-emerald-500 font-bold flex items-center gap-2">
               ← Back to Portal
             </button>

             <div className="bg-[#0A0A0A] rounded-[4rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,1)] p-10 md:p-24 relative overflow-hidden text-center">
                <div className="flex flex-col items-center mb-20">
                    <img src={LOGO_URL} className="w-24 h-24 mb-6 drop-shadow-xl" alt="Logo" />
                    <h2 className="text-4xl font-serif uppercase tracking-[0.3em] text-white">Official Presale</h2>
                    <div className="w-16 h-1 bg-emerald-500 mt-6" />
                </div>
                
                <div className="space-y-20">
                  <HeroSection />
                  <div className="h-px bg-white/5" />
                  <PresaleProgress />
                  <div className="bg-white/[0.02] p-8 md:p-16 rounded-[3.5rem] border border-white/5 shadow-inner">
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
  <button onClick={onClick} className="group p-12 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-left shadow-2xl">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-emerald-500 transition-all">
       <span className="text-emerald-500 group-hover:text-white">→</span>
    </div>
    <h3 className="text-2xl font-serif text-white/90 mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">{desc}</p>
  </button>
);

export default Index;
