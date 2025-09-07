"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasSeed = localStorage.getItem("seedPhrase");
    console.log("LOCALSTORAGE SEED: ", hasSeed);

    if (hasSeed) {
      router.push("/wallet");
    } else {
      router.push("/onboarding");
    }
  }, [router]);

  return null;
}