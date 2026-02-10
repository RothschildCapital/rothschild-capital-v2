import { motion } from "framer-motion";
import ConnectWallet from "./ConnectWallet";

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
    {/* Radial glow background */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 flex flex-col items-center text-center space-y-8"
    >
      {/* Official Rothschild Coat of Arms Logo */}
      <motion.img
        src="/logo-rtc.png"
        alt="Rothschild Capital Official Crest"
        className="w-44 h-44 md:w-60 md:h-60 object-contain drop-shadow-[0_0_35px_rgba(255,215,0,0.3)]"
        style={{ 
          filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.2))",
        }}
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Title & Branding */}
      <div className="space-y-3">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-[0.08em] bg-gradient-to-b from-white via-emerald-100 to-emerald-500 bg-clip-text text-transparent leading-tight uppercase font-light">
          Rothschild Capital
        </h1>
        <p className="font-heading text-lg md:text-xl tracking-[0.5em] uppercase text-emerald-500 font-bold">
          Sovereign Wealth Infrastructure
        </p>
      </div>

      {/* Institutional Token Info */}
      <div className="flex flex-wrap justify-center gap-8 text-sm bg-white/[0.02] border border-white/5 px-10 py-6 rounded-[2rem] backdrop-blur-md">
        <div className="text-center">
          <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-emerald-500/60 mb-1">Total Equity</p>
          <p className="font-body text-xl text-white">100,000,000 $RTC</p>
        </div>
        <div className="w-px h-10 bg-white/10 hidden md:block" />
        <div className="text-center">
          <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-emerald-500/60 mb-1">Exchange Rate</p>
          <p className="font-body text-xl text-white">1 SOL = 5,000 $RTC</p>
        </div>
        <div className="w-px h-10 bg-white/10 hidden md:block" />
        <div className="text-center">
          <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-emerald-500/60 mb-1">Settlement</p>
          <p className="font-body text-xl text-white">Solana Devnet</p>
        </div>
      </div>

      {/* Institutional Tagline */}
      <p className="font-body text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed italic font-light tracking-wide">
        "Bridging legacy capital with decentralized infrastructure for Healthcare and Education."
      </p>

      {/* Action Button */}
      <div className="pt-4 scale-110">
        <ConnectWallet />
      </div>

      {/* Bottom hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -bottom-20 text-emerald-500/20 text-xl"
      >
        ↓
      </motion.div>
    </motion.div>
  </section>
);

export default HeroSection;