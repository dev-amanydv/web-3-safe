"use client"
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

type ToastType = {
    message: string;
    type: 'Success' | 'Warning' | 'Error' | 'Information';
}

export default function Toast ({message,type}: ToastType) {

    const [count, setCount] = useState(0);
    useEffect(() => {
        setInterval(() => {
            setCount(prev => prev + 1)
        }, 1000)
    }, [])
    

    return (
        <div className="fixed top-0 flex justify-center mt-15 left-0 w-full min-h-15">
            <div className="max-w-lg border-[1px] border-[#3D3D3D] w-full items-start flex gap-5 px-5 py-3 bg-gray-600/30 backdrop-blur-lg rounded-2xl">
                <div>
                    <FaRegCheckCircle className="size-5 mt-3 text-[#65F07B]"/>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-white font-semibold">Success Notification</div>
                    <div className="text-[12px]">Congratulations! Your seed phrase has been verified. You can now access all you crypto wallets.</div>
                </div>
            </div>
        </div>
    )
}