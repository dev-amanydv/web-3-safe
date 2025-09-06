import { Poppins } from "next/font/google";
import Image from "next/image";


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300","400", "500", "600", "700", "800"],
  });

  type networkSelectScreenProps = {
    onSelectNetwork: (networkType: string) => void;
    currentNetwork: string;
    updateNetwork: (args: string) => void;
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