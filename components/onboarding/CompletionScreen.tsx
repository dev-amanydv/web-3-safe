import { Poppins } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300","400", "500", "600", "700", "800"],
  });

  export const CompletionScreen = () => {
    const router = useRouter();

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
        <button onClick={() => {router.push('/wallet')}} className="w-full disabled:bg-[#868789] disabled:text-[#111217] font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Open <span className={`${poppins.className} text-[#316dc8]`}>Web3</span><span className={`${poppins.className}`}>Safe</span></button>
      </div>
    </div>
  </div>
  }