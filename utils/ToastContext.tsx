"use client";
import Toast from '@/components/toast/Toast';
import React, { createContext, useState } from 'react';

type ToastConfig = {
    message: string;
    title: string;
    type: "Success" | "Error" | "Warning" | "Information";
}

type ToastContextType = {
    showToast: (message: string, title: string, type: ToastConfig["type"]) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider ({ children }: { children: React.ReactNode}) {
    const [toast, setToast] = useState<ToastConfig | null>(null);

    const showToast = (message: string, title: string, type: ToastConfig["type"], ) => {
        setToast({message, title, type});
        setTimeout(() => {
            setToast(null);
        }, 3500);
    }
    
    return (
        <ToastContext.Provider value={{ showToast }} >
            {children}
            {toast && <Toast message={toast.message} type={toast.type} title={toast.title} />}
        </ToastContext.Provider>
    )
}