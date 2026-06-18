import { WelcomeSequence } from "@/components/welcome/WelcomeSequence";
import { getGuestGreeting } from "@/lib/guestGreeting";

type HomePageProps = {
  searchParams: Promise<{
    to?: string | string[];
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { to } = await searchParams;
  const guestGreeting = getGuestGreeting(to);

  return <WelcomeSequence guestName={guestGreeting.name} />;
}
