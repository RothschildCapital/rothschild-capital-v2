import { motion } from "framer-motion";

const items = [
  { label: "Total Supply", value: "100M", subtext: "$RTC" },
  { label: "Presale Allocation", value: "50%", subtext: "50,000,000 $RTC" },
  { label: "Liquidity Pool", value: "30%", subtext: "30,000,000 $RTC" },
  { label: "Team & Development", value: "10%", subtext: "10,000,000 $RTC" },
  { label: "Marketing & Community", value: "10%", subtext: "10,000,000 $RTC" },
];

const TokenomicsSection = () => (
  <section className="py-24 px-6">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="font-heading text-3xl md:text-4xl text-center tracking-[0.1em] text-gold-gradient mb-4">
        Tokenomics
      </h2>
      <p className="text-center text-muted-foreground font-body text-lg mb-16">
        Rothschild Capital ($RTC) • Total Supply: 100,000,000
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-sm border border-border bg-card text-center space-y-2 ${
              i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <p className="font-heading text-3xl md:text-4xl text-primary">{item.value}</p>
            <p className="font-heading text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {item.label}
            </p>
            <p className="font-body text-sm text-muted-foreground/70">
              {item.subtext}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Exchange Rate Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 rounded-sm border border-primary/30 bg-card glow-gold text-center"
      >
        <p className="font-heading text-lg tracking-[0.1em] text-primary mb-2">
          Presale Rate
        </p>
        <p className="font-heading text-2xl md:text-3xl text-gold-gradient">
          1 SOL = 5,000 $RTC
        </p>
      </motion.div>
    </motion.div>
  </section>
);

export default TokenomicsSection;
