"use client";
import { Poppins } from "next/font/google";
import {useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { WelcomeScreen } from "./WelcomeScreen";
import { NetworkSelectionScreen } from "./NetworkSelectionScreen";
import { NewSeedPhrase } from "./NewSeedPhrase";
import { EnterSeedPhrase } from "./EnterSeedPhrase";
import { PasswordSetting } from "./PasswordSetting";
import { CompletionScreen } from "./CompletionScreen";


export default function OnBoarding () {

  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [copied, setCopied] = useState(false)

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
  const handleCopyToClipboard = (seedPhrase: string) => {
    try {
      navigator.clipboard.writeText(seedPhrase);
      setCopied(true)
    } catch (error) {
      console.log(error);
    } finally { nextStep() }
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
        return <NewSeedPhrase currentCopy={copied} updateCopy={setCopied} onCopySeed={handleCopyToClipboard} />;
      case 4 : 
        return <EnterSeedPhrase  />;
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