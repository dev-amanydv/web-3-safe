"use client";
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa";

type welcomeScreenProps = {
  onStart: () => void;
}
type networkSelectScreenProps = {
  onSelectNetwork: (networkType: string) => void;
}

export default function OnBoarding () {

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

  const handleNetworkSelect = (networkType: string) => {
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

  return <div className="flex flex-col max-w-2xl w-full">
    <div>
    <FaArrowLeft />
    </div>
    <div className="h-[500px]">
    {renderSteps()}
    </div>
</div>

}

export const WelcomeScreen = ({onStart}: welcomeScreenProps) => {
    
    return <div className="h-[600px] justify-between flex flex-col items-center max-w-2xl w-full">
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

  return <div className="h-screen py-10 justify-between flex flex-col items-center max-w-2xl w-full">
        <div className="text-white py-10 flex flex-col items-center justify-center">
            <div className="text-2xl rounded-full text-white font-sans font-semibold">
              Select one or more networks
            </div>
            <div className="text-[#969FAE] text-lg font-medium">
              You can always change this later
            </div>
            <div className="flex mt-10 gap-5">
              <button>Solana</button>
              <button>Ethereum</button>
            </div>
        </div>
        <div className="text-white flex gap-10 flex-col items-center w-full">
          <div className="flex justify-center gap-4 w-full max-w-md flex-col">
            <button onClick={() => onSelectNetwork(network)} className="w-full font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Set up wallet</button>
          </div>
        </div>
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