import * as anchor from "@anchor-lang/core";
import { Program } from "@anchor-lang/core";
import { RothschildCapital } from "../target/types/rothschild_capital";

describe("rothschild_capital", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.rothschildCapital as Program<RothschildCapital>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
