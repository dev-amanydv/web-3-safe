"use client";

import { GenerateKeyPairs } from "@/utils/GenerateKeyPairs";
import { generateMnemonic, mnemonicToSeed } from "bip39";

let cachedMnemonic: string | null = null;


export async function GenerateSeedPhrase(type: "Solana" | "Ethereum") {
  if (!cachedMnemonic) {
    cachedMnemonic = generateMnemonic();
    const seed = await mnemonicToSeed(cachedMnemonic)
    console.log("Seed phrase: ", cachedMnemonic);
    console.log("real seed: ", seed);
    GenerateKeyPairs(seed, "Solana");

  }
  return cachedMnemonic;
}