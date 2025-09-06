"use client";

import { generateMnemonic, mnemonicToSeedSync } from "bip39";

let cachedSeed: string | null = null;


export function GenerateSeedPhrase() {
  if (!cachedSeed) {
    cachedSeed = generateMnemonic();
    const realSeed = mnemonicToSeedSync(cachedSeed)
    console.log("Seed phrase: ", cachedSeed);
    console.log("real seed: ", realSeed)
  }
  return cachedSeed;
}