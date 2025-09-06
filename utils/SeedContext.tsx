"use client"
import { GenerateSeedPhrase } from '@/hooks/generateSeed';
import React, { createContext, useEffect, useState } from 'react';


export const SeedContext = createContext<string>("");

export function SeedProvider ({ children }: { children: React.ReactNode}) {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        const mnemonic = GenerateSeedPhrase();
        setSeed(mnemonic);
    }, []);
    
    

    return (
        <SeedContext.Provider value={seed}>
            {children}
        </SeedContext.Provider>
    )
}