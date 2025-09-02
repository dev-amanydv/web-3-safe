"use client";

import { generateMnemonic } from "bip39";
import { useState } from "react";

export async function GenerateSeedPhrase (){
    const [mnemonic, setMnemonic] = useState("");
    const generate = generateMnemonic();

    console.log("Generated seed: ", generate);
    
    setMnemonic(generate);

    return mnemonic;
}