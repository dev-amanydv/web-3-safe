import { GenerateSeedPhrase } from "@/hooks/generateSeed";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300","400", "500", "600", "700", "800"],
  });


type generateMnemonicProps = {
    onCopySeed: (seedPhrase: string) => void;
    currentCopy: boolean;
    updateCopy:(args: boolean) => void;
  }

  export const NewMnemonic =  ({onCopySeed, currentCopy, updateCopy}: generateMnemonicProps) => {

    const [mnemonic, setMnemonic] = useState("");
    const [accept, setAccept] = useState(false)
  
    useEffect(() => {
      async function handleGenerateSeedAndKeys (){
        const generatedMnemonic = await GenerateSeedPhrase("Solana");
        setMnemonic(generatedMnemonic);
      };
      handleGenerateSeedAndKeys()
    }, []);
    const words = mnemonic.split(" ");
    
    return <div className="gap-20 justify-between flex flex-col items-center max-w-2xl w-full">
          <div className="text-white flex flex-col items-center justify-center">
              <div className="text-2xl rounded-full text-white font-sans font-semibold">
                Secret Recovery Phrase
              </div>
              <div className="text-[#969FAE] text-md font-medium">
               Save these words in a safe place.
              </div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {
              words.map((word, index) => (
                <input readOnly value={word} key={index} type="text" className="w-20 h-10 focus:outline-0 text-center border-b-2 border-[#969FAE] text-white" />
              ))
            }
          </div>
          <div className="text-white flex gap-10 flex-col items-center w-full">
            <div className="flex gap-5">
              <input checked={accept} className="cursor-pointer size-5" onChange={() => { setAccept(!accept)}} type="checkbox" name="Terms and Condition" id="" />
              <h1 className="font-semibold">I saved my secret <span className="">Recovery Phrase</span></h1>
            </div>
            <div className="flex justify-center gap-4 w-full max-w-md flex-col">
              <button disabled={!accept} onClick={() => {onCopySeed(mnemonic)}} className="w-full cursor-pointer disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">{ currentCopy === false ? "Copy seed phrase" : "Copied!"}</button>
            </div>
          </div>
      </div>
  }