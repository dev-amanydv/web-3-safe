export const WelcomeScreen = () => {
    
    return <div>
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
            <button className="w-full font-semibold bg-white hover:bg-gray-200 rounded-md py-3 text-black">Create a new wallet</button>
            <button className="w-full rounded-md font-semibold py-3 hover:bg-neutral-800 bg-[#202125] text-white">I already have a wallet</button>
          </div>
        </div>
    </div>
}