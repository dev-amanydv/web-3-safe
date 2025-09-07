"use client";
import { Poppins } from "next/font/google";
import {useContext, useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { WelcomeScreen } from "./WelcomeScreen";
import { NetworkSelectionScreen } from "./NetworkSelectionScreen";
import { NewMnemonic } from "./NewMnemonic";
import { EnterMnemonic } from "./EnterMnemonic";
import { PasswordSetting } from "./PasswordSetting";
import { CompletionScreen } from "./CompletionScreen";
import { ToastContext } from "@/utils/ToastContext";


export default function OnBoarding () {

  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [copied, setCopied] = useState(false)

  const { showToast } = useContext(ToastContext)!;
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
    localStorage.setItem("Network", networkType);
    nextStep()
  }
  const handleCopyToClipboard = (seedPhrase: string) => {
    try {
      navigator.clipboard.writeText(seedPhrase);
      setCopied(true);
      showToast("Your seed is succesfully copied!", "Copied", "Information")
    } catch (error) {
      console.log(error);
    } finally { nextStep() }
  }

  const handlePassword = (pass: string) => {
    setPassword(pass);
    nextStep()
  }

  

  const renderSteps = () => {
    switch (step){
      case 1 : 
        return <WelcomeScreen onStart={nextStep} />;
      case 2 :
        return <NetworkSelectionScreen currentNetwork={network} updateNetwork={setNetwork} onSelectNetwork={handleNetworkSelect}  />;
      case 3 : 
        return <NewMnemonic currentCopy={copied} updateCopy={setCopied} onCopySeed={handleCopyToClipboard} />;
      case 4 : 
        return <EnterMnemonic onNext={nextStep}  />;
      case 5 : 
        return <PasswordSetting onSetPassword={handlePassword} />;
      case 6 : 
        return <CompletionScreen />;
      default: 
        return <WelcomeScreen onStart={nextStep} />;
    }
  }

  return <div className="flex flex-col max-w-2xl w-full">
    {step > 1 && step < 6 && (
      <button className="cursor-pointer text-white" onClick={prevStep}>
    <FaArrowLeft/>
    </button>
    )}
    <div className="h-[500px] mt-10">
    {renderSteps()}
    </div>
</div>
}