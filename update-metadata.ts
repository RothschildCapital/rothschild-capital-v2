import { createMetadataAccountV3, CreateMetadataAccountV3InstructionArgs, CreateMetadataAccountV3InstructionAccounts } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { Keypair } from "@solana/web3.js";
import * as fs from 'fs';

const umi = createUmi("https://api.devnet.solana.com");
const keypairData = JSON.parse(fs.readFileSync(process.env.HOME + '/.config/solana/id.json', 'utf-8'));
const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(keypair));
umi.use(signerIdentity(signer));

async function main() {
    const mint = publicKey("ZPoJxBmpfx9XUgEShitnHnJXSsfR8m5AojNDTcXvudz");
    const metadata = {
        name: "Rothschild Capital",
        symbol: "RTC",
        uri: "https://raw.githubusercontent.com/muhammadjefry/rothschild_capital/main/metadata.json",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
    };

    console.log("Mengikat identitas Rothschild ke Blockchain...");
    // Logic untuk create/update metadata
}
main();
