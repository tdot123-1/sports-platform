import Image from "next/image";
import { Button } from "../ui/button";
import { HelpCircleIcon, TrophyIcon } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="px-4 h-[70vh] overflow-hidden">
      <div className="flex justify-evenly items-center py-4 max-h-full">
        <div className="flex flex-col gap-8 text-lg w-5/12">
          <h1 className="font-mono text-xl lg:text-3xl mb-2">Where Basketball Happens</h1>
          <h2 className="text-base lg:text-xl">Connect with athletes, coaches, trainers, and organizers.</h2>
          <h3 className="text-base lg:text-xl">
            Find or create tournaments, matchups, training sessions, and more.
          </h3>
          <div className="flex flex-col lg:flex-row justify-start gap-4 mt-4">
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
        <div className="w-5/12 lg:w-4/12 max-h-full">
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
