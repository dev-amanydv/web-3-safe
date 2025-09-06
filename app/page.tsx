import { Container } from "@/components/Container";
import OnBoarding from "@/components/onboarding/onBoarding";
import Toast from "@/components/toast/Toast";

export default function Home() {
  return (
    <div className="font-sans  w-full flex justify-center bg-black">
      <Container>
        <OnBoarding/>
        <Toast message={"Verified Successfully"} type={"Success"}/>
      </Container>
    </div>
  );
}
