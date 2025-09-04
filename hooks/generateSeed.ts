"use client";

import { generateMnemonic } from "bip39";

let cachedSeed: string | null = null;

export function GenerateSeedPhrase() {
  if (!cachedSeed) {
    cachedSeed = generateMnemonic();
    console.log("Seed phrase: ", cachedSeed);
  }
  return cachedSeed;
}