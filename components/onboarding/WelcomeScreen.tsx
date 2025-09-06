import { Poppins } from "next/font/google";
import Image from "next/image";
import { useState } from "react"

type welcomeScreenProps = {
    onStart: () => void;
  }

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300","400", "500", "600", "700", "800"],
  });

export const WelcomeScreen = ({onStart}: welcomeScreenProps) => {
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    
    return <div className=" justify-between gap-50 flex flex-col items-center max-w-2xl w-full">
        <div className="text-white py-10 flex flex-col items-center justify-center">
            <div className="size-20 rounded-full flex text-sm justify-center items-center mb-5 bg-gray-900"><Image src={'/web3safeLogoMark.svg'} priority={true} height={100} width={100} alt="Web3Safe Logo by Aman Yadav | Full-Stack Developer" /></div>
            <div className="text-2xl rounded-full text-white font-sans font-semibold">
              Welcome to <span className={`${poppins.className} text-[rgb(80,144,242)] font-bold`}>Web3</span><span className={`${poppins.className} font-bold`}>Safe</span>
            </div>
            <div className="text-[#969FAE] text-md font-medium">
              You can send and recieve crypto by using this wallet
            </div>
        </div>
        <div className="text-white flex gap-10 flex-col items-center w-full">
          <div className="flex items-center gap-5">
            <input type="checkbox" className="size-4" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} name="Terms and Condition" id="" />
            <h1 className="font-semibold">I agree to the <span className="">Terms of Service</span></h1>
          </div>
          <div className="flex justify-center gap-4 w-full max-w-md flex-col">
            <button disabled={!acceptedTerms} onClick={onStart} className="w-full disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Create a new wallet</button>
            <button disabled={true} className="w-full disabled:text-gray-700 cursor-no-drop disabled:bg-gray-900 rounded-md font-semibold py-3  bg-[#202125] text-white">I already have a wallet</button>
          </div>
        </div>
    </div>
}
