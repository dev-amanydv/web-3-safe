import { Poppins } from "next/font/google";
import Image from "next/image";
import { useRef, useState } from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300","400", "500", "600", "700", "800"],
  });

  type passwordSetScreenProps = {
    onSetPassword: (pass: string) => void;
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