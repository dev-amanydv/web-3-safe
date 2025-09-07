import { MnemonicContext } from "@/utils/MenmonicContext";
import { ToastContext } from "@/utils/ToastContext";
import { mnemonicToSeed, mnemonicToSeedSync } from "bip39";
import { useContext, useEffect, useState } from "react";


  export const EnterMnemonic = ({onNext}: {onNext: () => void}) => {
    const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(""));
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState<boolean | null>(null);

    const mnemonic  = useContext(MnemonicContext);
    console.log("Recieved seed: ", mnemonic)
    const { showToast }  = useContext(ToastContext)!;

    const mnemonicArray = mnemonic.split(" ");
    const handlePaste = async () => {
      try {
        const text = await navigator.clipboard.readText();
        const words = text.trim().split(/\s+/).slice(0, 12);
        const filled = [...mnemonicWords];
        words.forEach((word, idx) => {
          if (idx < 12) filled[idx] = word;
        });
        setMnemonicWords(filled);
      } catch (error) {
        console.log("Failed to read clipboard: ", error);
      }
    }
    
    const handleChange = (value: string, index: number) => {
      const updated = [...mnemonicWords];
       updated[index] = value;
       setMnemonicWords(updated);
    }
  
    useEffect(() => {
      const handleKeyDown = async ( e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "v"){
          e.preventDefault();
          await handlePaste()
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } ,[mnemonicWords])

    const verify = async () => {
        setLoading(true);
        try {
          const isSame = mnemonicWords.length === mnemonicArray.length && mnemonicWords.every((word, idx) => word === mnemonicArray[idx])
          console.log("ENTERED PHRASE: ", mnemonicWords);
          console.log("ACTUAL PHRASE: ", mnemonicArray);
          if (isSame){
            setVerified(true);
            showToast("Congratulations! You can now access your all wallets and make payments.", "Verification Successfull!", "Success");
            localStorage.setItem("seedPhrase", mnemonic);
            const seed = await mnemonicToSeed(mnemonic);
            console.log("Real seed: ", seed)
            onNext();
          } else {
            setVerified(false);
            showToast("Sorry! You have entered an wrong seed phrase.", "Verification Failed", "Error")
          }
        } catch (error) {
          console.log('Error in verifying Seed Phrase: ', error);
        } finally {
          setLoading(false)
        }
    }
  
    return <div className="gap-20 justify-between flex flex-col items-center max-w-2xl w-full">
    <div className="text-white flex flex-col items-center justify-center">
        <div className="text-2xl rounded-full text-[#ffffff] font-sans font-semibold">
          Secret Recovery Phrase
        </div>
        <div className="text-[#969FAE] text-md font-medium">
         Save these words in a safe place.
        </div>
    </div>
    <div className="grid grid-cols-4 gap-5">
      {
        mnemonicWords.map((word, index) => (
          <input key={index} value={word} onChange={(e) => handleChange(e.target.value, index)} type="text" className="w-20 h-10 focus:outline-0 text-center border-b-2 border-[#969FAE] text-white" />
        ))
      }
    </div>
    <div className="text-white flex gap-10 flex-col items-center w-full">
      <div className="flex justify-center gap-4 w-full max-w-md flex-col">
        <button onClick={() => {handlePaste()}} className="w-full cursor-pointer disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-gray-950 hover:bg-gray-900 rounded-md py-3 border-[0.5px] border-gray-200 text-white">Paste</button>
        <button onClick={() => {verify()}} className="w-full cursor-pointer disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">{loading === true ? "Verifying..." : "Next"}</button>
      </div>
    </div>
  </div>
  }