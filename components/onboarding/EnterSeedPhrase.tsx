import { SeedContext } from "@/utils/SeedContext";
import { ToastContext } from "@/utils/ToastContext";
import { useContext, useEffect, useState } from "react";


  export const EnterSeedPhrase = () => {
    const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(""));
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState<boolean | null>(null);

    const seed  = useContext(SeedContext);
    console.log("Recieved seed: ", seed)
    const { showToast }  = useContext(ToastContext)!;

    const seedArray = seed.split(" ");
    const handlePaste = async () => {
      try {
        const text = await navigator.clipboard.readText();
        const words = text.trim().split(/\s+/).slice(0, 12);
        const filled = [...seedWords];
        words.forEach((word, idx) => {
          if (idx < 12) filled[idx] = word;
        });
        setSeedWords(filled);
      } catch (error) {
        console.log("Failed to read clipboard: ", error);
      }
    }
    
    const handleChange = (value: string, index: number) => {
      const updated = [...seedWords];
       updated[index] = value;
       setSeedWords(updated);
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
    } ,[seedWords])

    const verify = async () => {
        setLoading(true);
        try {
          const isSame = seedWords.length === seedArray.length && seedWords.every((word, idx) => word === seedArray[idx])
          console.log("ENTERED PHRASE: ", seedWords);
          console.log("ACTUAL PHRASE: ", seedArray);
          if (isSame){
            setVerified(true);
            showToast("Congratulations! You can now access your all wallets and make payments.", "Verification Successfull", "Success")
            console.log("SEED PHRASE VERIFIED");
          } else {
            console.log("NOT VERIFIED")
          }
        } catch (error) {
          console.log('Error in verifying Seed Phrase: ', error);
        } finally {
          setLoading(false)
        }
    }
  
    return <div className="gap-20 justify-between flex flex-col items-center max-w-2xl w-full">
    <div className="text-white py-10 flex flex-col items-center justify-center">
        <div className="text-2xl rounded-full text-white font-sans font-semibold">
          Secret Recovery Phrase
        </div>
        <div className="text-[#969FAE] text-md font-medium">
         Save these words in a safe place.
        </div>
    </div>
    <div className="grid grid-cols-4 gap-5">
      {
        seedWords.map((word, index) => (
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