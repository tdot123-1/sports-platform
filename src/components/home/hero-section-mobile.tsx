import Link from "next/link";
import { Button } from "../ui/button";
import { HelpCircleIcon, TrophyIcon } from "lucide-react";

const HeroSectionMobile = () => {
  return (
    <section className="h-screen px-2 relative">
      <div className="absolute inset-0 bg-basket-img bg-cover bg-center blur-sm"></div>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="flex flex-col gap-12 text-lg relative py-24 text-center">
        <h1 className="font-mono text-2xl text-muted">Where Basketball Happens</h1>
        <h2 className="text-muted">Connect with athletes, coaches, trainers, and organizers.</h2>
        <h3 className="text-muted">
          Find or create tournaments, matchups, training sessions, and more.
        </h3>
        <div className="flex justify-center gap-4 mt-4">
          <Link href={"/about"}>
            <Button variant={`outline`}>
              <HelpCircleIcon />
              Learn more
            </Button>
          </Link>
          <Link href={"/events/grid"}>
            <Button>
              <TrophyIcon />
              Find events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionMobile;
