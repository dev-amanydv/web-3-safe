"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { GenerateSeedPhrase } from "@/hooks/generateSeed";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300","400", "500", "600", "700", "800"],
});

type welcomeScreenProps = {
  onStart: () => void;
}

type networkSelectScreenProps = {
  onSelectNetwork: (networkType: string) => void;
  currentNetwork: string;
  updateNetwork: (args: string) => void;
}

type passwordSetScreenProps = {
  onSetPassword: (pass: string) => void;
}

export default function OnBoarding () {

  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const nextStep = () => {
    if ( step < 6 ) {
      setStep(step + 1);
    }
  }

  const prevStep = () => {
    if (step > 1){
      setStep( step - 1 );
      setNetwork("")
    }
  }

  const handleNetworkSelect = (networkType: string) => {
    setNetwork(networkType);
    nextStep()
  }

  const handlePassword = (pass: string) => {
    setPassword(pass);
    nextStep()
  }

  const finishOnBoarding = () => {
    setisLoading(true);

    try {
      console.log("OnBoarding complete... Finishing setup")
    } catch (error) {
      
    } finally {
      setisLoading(false);
    }
  }

  const renderSteps = () => {
    switch (step){
      case 1 : 
        return <WelcomeScreen onStart={nextStep} />;
      case 2 :
        return <NetworkSelectionScreen currentNetwork={network} updateNetwork={setNetwork} onSelectNetwork={handleNetworkSelect}  />;
      case 3 : 
        return <NewSeedPhrase />;
      case 4 : 
        return <EnterSeedPhrase />;
      case 5 : 
        return <PasswordSetting onSetPassword={handlePassword} />;
      case 6 : 
        return <CompletionScreen />;
      default: 
        return <WelcomeScreen onStart={nextStep} />;
    }
  }

  return <div className="flex flex-col py-10 max-w-2xl w-full">
    {step > 1 && step < 4 && (
      <button className="cursor-pointer text-white" onClick={prevStep}>
    <FaArrowLeft/>
    </button>
    )}
    <div className="h-[500px]">
    {renderSteps()}
    </div>
</div>
}

export const WelcomeScreen = ({onStart}: welcomeScreenProps) => {
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    
    return <div className=" justify-between gap-50 flex flex-col items-center max-w-2xl w-full">
        <div className="text-white py-10 flex flex-col items-center justify-center">
            <div className="size-20 rounded-full flex text-sm justify-center items-center mb-5 bg-gray-900"><Image src={'/web3safeLogoMark.svg'} height={100} width={100} alt="Web3Safe Logo by Aman Yadav | Full-Stack Developer" /></div>
            <div className="text-2xl rounded-full text-white font-sans font-semibold">
              Welcome to <span className={`${poppins.className} text-[#5090F2] font-bold`}>Web3</span><span className={`${poppins.className} font-bold`}>Safe</span>
            </div>
            <div className="text-[#969FAE] text-md font-medium">
              You can send and recieve crypto by using this wallet
            </div>
        </div>
        <div className="text-white flex gap-10 flex-col items-center w-full">
          <div className="flex gap-5">
            <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} name="Terms and Condition" id="" />
            <h1 className="font-semibold">I agree to the <span className="">Terms of Service</span></h1>
          </div>
          <div className="flex justify-center gap-4 w-full max-w-md flex-col">
            <button disabled={!acceptedTerms} onClick={onStart} className="w-full disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Create a new wallet</button>
            <button disabled={true} className="w-full disabled:text-gray-700 cursor-no-drop disabled:bg-gray-900 rounded-md font-semibold py-3  bg-[#202125] text-white">I already have a wallet</button>
          </div>
        </div>
    </div>
}

export const NetworkSelectionScreen = ({onSelectNetwork, currentNetwork, updateNetwork}: networkSelectScreenProps) => {

  return <div className="gap-70 justify-between flex flex-col items-center max-w-2xl w-full">
    <div className="text-white py-10 flex flex-col items-center justify-center">
      <div className="text-2xl rounded-full text-white font-sans font-semibold">
        Select one network
      </div>
      <div className="text-[#969FAE] text-md font-medium">
        You can always change this later
      </div>
      <div className="flex mt-20 gap-5">
        <button value="Solana" className="bg-[#14182e] cursor-pointer hover:outline-2 hover:outline-[#8A8B8E] focus:outline-2 focus:outline-[#8A8B8E] active:bg-[#4a58a8] justify-center flex items-center gap-3 rounded-md w-40 py-2" onClick={() => updateNetwork("Solana")} ><Image priority src={"/solanaLogoMark.png"} height={20} width={20} alt="Solana Logo"/><h1>Solana</h1></button>
        <button value="Ethereum" className="bg-[#14182e] cursor-pointer hover:outline-2 hover:outline-[#8A8B8E] focus:outline-2  focus:outline-[#8A8B8E] active:bg-[#4a58a8] flex justify-center items-center gap-3 rounded-md w-40 py-1" onClick={() => updateNetwork("Ethereum")} ><div><svg xmlns="http://www.w3.org/2000/svg" width=".63em" height="1em" fill="none" className="text-[22px] opacity-85 hover:opacity-100" viewBox="0 0 115 182"><path fill="#F0CDC2" stroke="#1616B4" d="M57.505 181v-45.16L1.641 103.171z"></path><path fill="#C9B3F5" stroke="#1616B4" d="M57.69 181v-45.16l55.865-32.669z"></path><path fill="#88AAF1" stroke="#1616B4" d="M57.506 124.615V66.979L1 92.28z"></path><path fill="#C9B3F5" stroke="#1616B4" d="M57.69 124.615V66.979l56.506 25.302z"></path><path fill="#F0CDC2" stroke="#1616B4" d="M1 92.281 57.505 1v65.979z"></path><path fill="#B8FAF6" stroke="#1616B4" d="M114.196 92.281 57.691 1v65.979z"></path></svg></div><h1>Ethereum</h1></button>
      </div>
    </div>
    <div className="text-white flex gap-10 flex-col items-center w-full">
      <div className="flex justify-center gap-4 w-full max-w-md flex-col">
        <button disabled={!currentNetwork}  onClick={() => {onSelectNetwork(currentNetwork),console.log("selected network: ", currentNetwork)}} className="w-full disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Set up wallet</button>
      </div>
    </div>
    </div>
}

export const NewSeedPhrase =  () => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const inputBoxes = Array(12).fill(null);

  useEffect(() => {
    const mnemonic = GenerateSeedPhrase();
    setSeedPhrase(mnemonic);
    console.log("mnemonic: ", seedPhrase);
  }, []);

  return <div className="gap-30 justify-between flex flex-col items-center max-w-2xl w-full">
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
            inputBoxes.map((index) => (
              <input readOnly value={'Aman'} key={index} type="text" className="w-20 h-10 text-center border-b-2 border-[#969FAE] text-white" />
            ))
          }
        </div>
        <div className="text-white flex gap-10 flex-col items-center w-full">
          <div className="flex gap-5">
            <input type="checkbox" name="Terms and Condition" id="" />
            <h1 className="font-semibold">I saved my secret <span className="">Recovery Phrase</span></h1>
          </div>
          <div className="flex justify-center gap-4 w-full max-w-md flex-col">
            <button className="w-full disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Copy Seed Phrase</button>
          </div>
        </div>
    </div>
}

export const EnterSeedPhrase = () => {
  return <div></div>
}

export const PasswordSetting = ({onSetPassword}: passwordSetScreenProps) => {

  const passRef = useRef<(HTMLInputElement | null)[]>([]);
  const setPass = useRef<HTMLButtonElement | null>(null);
  const [inputPass, setInputPass] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {

    const value = e.target.value;
    setInputPass((prev) => {
      const passArr = prev.split("");
      passArr[index] = value;
      return passArr.join("");
    });
    if (value && index < passRef.current.length - 1){
      passRef.current[index + 1]?.focus();
    }
    if (value && index === passRef.current.length - 1){
      setPass.current?.focus()
    }
    if (!value && index > 0){
      passRef.current[index - 1]?.focus()
    }
    console.log(inputPass)
  }
  return <div className=" justify-between gap-50 flex flex-col items-center max-w-2xl w-full">
  <div className="text-white py-10 flex flex-col items-center justify-center">
  <div className="size-20 rounded-full flex text-sm justify-center items-center mb-5 bg-gray-900"><Image src={'/web3safeLogoMark.svg'} height={100} width={100} alt="Web3Safe Logo by Aman Yadav | Full-Stack Developer" /></div>
  <div className="text-2xl rounded-full text-white font-sans font-semibold">
        Set up a password
      </div>
      <div className="text-[#969FAE] text-md text-center font-medium">
        It should be 4 characters long. You'll need this to unlock Web3Safe.
      </div>
      <div className="flex mt-10 gap-5">
        {
          [0, 1, 2, 3].map((_, index) => (
            <input type="text" key={index} autoFocus={index == 0} maxLength={1} ref={(el) => {
              passRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e, index)}
           className="bg-gray-700 text-center font-bold text-xl text-white  size-15 rounded-md" name="" id="" />
          ))
        }
      </div>
  </div>
  <div className="text-white flex gap-10 flex-col items-center w-full">
    <div className="flex justify-center gap-4 w-full max-w-md flex-col">
      <button ref={setPass} disabled={inputPass.length < 4} onClick={() => {onSetPassword(inputPass);}} className="w-full disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Next</button>
    </div>
  </div>
</div>
}

export const CompletionScreen = () => {

  return <div className=" justify-between gap-50 flex flex-col items-center max-w-2xl w-full">
  <div className="text-white py-10 flex flex-col items-center justify-center">
      <div className="size-20 rounded-full flex text-sm justify-center items-center mb-5 bg-gray-900"><Image src={'/web3safeLogoMark.svg'} height={100} width={100} alt="Web3Safe Logo by Aman Yadav | Full-Stack Developer" /></div>
      <div className="text-2xl rounded-full text-white font-sans font-semibold">
        You're all good!
      </div>
      <div className="text-[#969FAE] text-md font-medium">
        You have completed the setting up of your wallet.
      </div>
  </div>
  <div className="text-white flex gap-10 flex-col items-center w-full">
    
    <div className="flex justify-center gap-4 w-full max-w-md flex-col">
      <button onClick={() => { }} className="w-full disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Open <span className={`${poppins.className} text-[#316dc8]`}>Web3</span><span className={`${poppins.className}`}>Safe</span></button>
    </div>
  </div>
</div>
}