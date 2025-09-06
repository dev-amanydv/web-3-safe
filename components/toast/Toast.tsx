"use client"
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";

type ToastType = {
    message: string;
    title: string;
    type: 'Success' | 'Warning' | 'Error' | 'Information';
}

export default function Toast({message, title, type }: ToastType) {
    const [visible, setVisible] = useState(true);
    const [animate, setAnimate] = useState("translate-y-[-100%] opacity-0");

    useEffect(() => {
        setTimeout(() => setAnimate("translate-y-0 opacity-100"), 50);

        const timer = setTimeout(() => {
            setAnimate("translate-y-[-100%] opacity-0");
            setTimeout(() => setVisible(false), 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const config = {
        Success: {
            title: title,
            icon: <FaRegCheckCircle className="size-5 mt-1 text-[#65F07B]" />
        },
        Warning: {
            title: title,
            icon: <AiOutlineWarning className="size-5 mt-1 text-yellow-400" />
        },
        Error: {
            title: title,
            icon: <MdErrorOutline className="size-5 mt-1 text-red-500" />
        },
        Information: {
            title: title,
            icon: <AiOutlineInfoCircle className="size-5 mt-1 text-blue-400" />
        }
    }[type];

    if (!visible) return null;

    return (
        <div className={`fixed top-8 flex justify-center left-0 w-full transition-all duration-300 ease-in-out ${animate}`}>
            <div className="max-w-lg border border-[#3D3D3D] w-full items-start flex gap-3 px-5 py-3 bg-gray-700/30 backdrop-blur-sm rounded-2xl">
                <div>{config.icon}</div>
                <div className="flex flex-col gap-1">
                    <div className="text-white font-semibold">{config.title}</div>
                    <div className="text-[12px] text-white">{message}</div>
                </div>
            </div>
        </div>
    );
}