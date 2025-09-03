"use client";

import { generateMnemonic } from "bip39";

export async function GenerateSeedPhrase (){
    const generatedSeed = generateMnemonic();
    
    return generatedSeed;
}