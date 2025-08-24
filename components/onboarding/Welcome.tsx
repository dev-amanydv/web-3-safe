"use client";
import { useState } from "react"

type welcomeScreenProps = {
  onStart: () => void;
}
type networkSelectScreenProps = {
  onSelectNetwork: () => void;
}

export default function onBoarding () {

  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState("");
  const [password, setPassword] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const nextStep = () => {
    if ( step < 4 ) {
      setStep(step + 1);
    }
  }

  const prevStep = () => {
    if (step > 1){
      setStep( step - 1 )
    }
  }

  const handleNetworkSelect = (networkType: "Solana" | "Ethereum" | "Bitcoin") => {
    setNetwork(networkType);
    nextStep()
  }

  const handlePassword = (pass: number) => {
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
        return <NetworkSelectionScreen onSelectNetwork={handleNetworkSelect}  />;
      case 3 : 
        return <PasswordSetting />;
      case 4 : 
        return <CompletionScreen />;
      default: 
        return < WelcomeScreen onStart={nextStep} />;
    }
  }

  return <div className=" h-screen justify-between flex flex-col items-center max-w-2xl w-full">
    {renderSteps()}
</div>

}

export const WelcomeScreen = ({onStart}: welcomeScreenProps) => {
    
    return <div className="h-screen justify-between flex flex-col items-center max-w-2xl w-full">
        <div className="text-white py-10 flex flex-col items-center justify-center">
            <div className="size-20 rounded-full flex text-sm justify-center items-center mb-5 bg-gray-900">Web3Safe</div>
            <div className="text-2xl rounded-full text-white font-sans font-semibold">
              Welcome to Web3Safe
            </div>
            <div className="text-[#969FAE] text-lg font-medium">
              You can send and recieve crypto by using this wallet
            </div>
        </div>
        <div className="text-white flex gap-10 flex-col items-center w-full">
          <div className="flex gap-5">
            <input type="checkbox" name="Terms and Condition" id="" />
            <h1 className="font-semibold">I agree to <span className="text-[#4C94FF]">the Terms of Service</span></h1>
          </div>
          <div className="flex justify-center gap-4 w-full max-w-md flex-col">
            <button onClick={onStart} className="w-full font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Create a new wallet</button>
            <button disabled={true} className="w-full disabled:text-gray-400 rounded-md font-semibold py-3  bg-[#202125] text-white">I already have a wallet</button>
          </div>
        </div>
    </div>
}

export const NetworkSelectionScreen = ({onSelectNetwork}: networkSelectScreenProps) => {

  return <div>
    Step-2
  </div>
}

export const PasswordSetting = () => {

  return <div>
    Step-3
  </div>
}

export const CompletionScreen = () => {

  return <div>
    Step-4
  </div>
}