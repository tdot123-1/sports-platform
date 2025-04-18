import Image from "next/image";
import { Button } from "../ui/button";
import { HelpCircleIcon, TrophyIcon } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="h-screen px-4">
      <div className="flex justify-evenly items-center  py-4">
        <div className="flex flex-col gap-4 text-lg">
          <h1 className="font-mono text-2xl">Where Basketball Happens</h1>
          <h2>Connect with athletes, coaches, trainers, and organizers.</h2>
          <h3>
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
        <div className="w-1/3 max-h-full">
          <Image
            className="rounded-md"
            src={"/hero-basket.jpg"}
            alt="Image of basket and basketball"
            width={1280}
            height={1920}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
