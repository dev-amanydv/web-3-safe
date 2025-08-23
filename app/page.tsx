import { Container } from "@/components/Container";
import { WelcomeScreen } from "@/components/onboarding/Welcome";

export default function Home() {
  return (
    <div className="font-sans h-screen w-full flex justify-center bg-black">
      <Container>
        <WelcomeScreen/>
      </Container>
    </div>
  );
}
