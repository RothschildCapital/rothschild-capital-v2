import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";

const ConnectWallet = () => {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  const displayAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="relative px-8 py-3 font-heading text-sm tracking-[0.2em] uppercase bg-gold-gradient text-primary-foreground rounded-sm shimmer glow-gold transition-all duration-300"
    >
      {connected ? displayAddress : "Connect Wallet"}
    </motion.button>
  );
};

export default ConnectWallet;
