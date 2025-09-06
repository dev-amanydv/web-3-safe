import OnBoarding from "@/components/onboarding/onBoarding";
import { SeedProvider } from "@/utils/SeedContext";

export default function Page() {
  return (
    <SeedProvider>
        <OnBoarding/>
    </SeedProvider>
  );
}
