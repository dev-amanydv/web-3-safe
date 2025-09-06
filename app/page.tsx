"use client";
import { Container } from "@/components/Container";
import OnBoarding from "@/components/onboarding/onBoarding";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const hasSeed = localStorage.getItem("seedPhrase");
  console.log('LOCALSTORAGE SEED: ', hasSeed)
  if (hasSeed) {
    router.push('/dashboard')
  } else {
    router.push('/onboarding')
  }
  return (
    <div className="font-sans  w-full flex justify-center bg-black">
      <Container>
        <OnBoarding/>
      </Container>
    </div>
  );
}
