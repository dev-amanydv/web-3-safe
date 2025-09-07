"use client"
import { GenerateSeedPhrase } from '@/hooks/generateSeed';
import React, { createContext, useEffect, useState } from 'react';


export const MnemonicContext = createContext<string>("");

export function SeedProvider ({ children }: { children: React.ReactNode}) {
    const [mnemonic, setMnemonic] = useState("");

    useEffect(() => {
        async function GenerateSeedAndKeys() {
            const generatedMnemonic = await GenerateSeedPhrase("Solana");
            setMnemonic(generatedMnemonic);
        };
        GenerateSeedAndKeys();
    }, []);

    return (
        <MnemonicContext.Provider value={mnemonic}>
            {children}
        </MnemonicContext.Provider>
    )
}