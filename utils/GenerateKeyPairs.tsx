"use client";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { useContext, useState } from "react";
import nacl from "tweetnacl";
import { MnemonicContext } from "./MenmonicContext";
import { mnemonicToSeed } from "bip39";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";

export function GenerateKeyPairs(seed: Buffer, type: 'Solana' | 'Ethereum') {
    
    if (type === 'Solana'){
        SolanaWallet()
    } else {
        EthereumWallet()
    }
}
export async function SolanaWallet (){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    const GenerateSolanaKeyPairs = async () => {
        const mnemonic = useContext(MnemonicContext);
        const seed = await mnemonicToSeed(mnemonic)
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex + 1);
        setPublicKeys([...publicKeys, keypair.publicKey]);
        localStorage.setItem("Solana Keys", publicKeys);
    }
    console.log("Solana Keys: ", publicKeys)

    if (currentIndex === 0) return null;

    return <div>
        <button onClick={() => {
            GenerateSolanaKeyPairs()
        }}>Add New Wallet</button>
    </div>
}

export function EthereumWallet (){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    const GenerateEthereumKeyPairs = async () => {
        const mnemonic = useContext(MnemonicContext);
        const seed = await mnemonicToSeed(mnemonic)
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentIndex(currentIndex + 1);
        setAddresses([...addresses, wallet.address]);
        localStorage.setItem("Ethereum Addresses", addresses);
    }
    console.log("Ethereum Keys: ", addresses)
    if (currentIndex === 0) return null;

    return <div>
        <button onClick={() => {
            GenerateEthereumKeyPairs()
        }}>Add New Wallet</button>
    </div>
}