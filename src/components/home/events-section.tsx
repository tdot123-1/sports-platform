import {
  AwardIcon,
  CalendarIcon,
  DumbbellIcon,
  HandshakeIcon,
  MapPinIcon,
  MedalIcon,
  TentIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const EventsSection = () => {
  return (
    <section className="px-4 py-8 mb-12 text-base md:text-lg">
      <h2 className="text-2xl md:text-3xl font-mono font-semibold text-primary text-center">
        Find the right events for you
      </h2>
      <div className="my-8 text-center">
        <p className="mx-auto w-full lg:w-2/3 mb-4">
          Looking for something specific? Easily find exactly what you need with
          filters, sorting, and search options. Whether you're interested in
          tournaments, training sessions, camps, or matchups — it's just a few
          clicks away.
        </p>
        <div className="flex justify-evenly flex-wrap gap-2 lg:gap-8 px-4 py-8">
          <Link href={"/events/grid?page=1&et=tournament"}>
            <Button>
              <MedalIcon />
              Tournaments
            </Button>
          </Link>

          <Link href={"/events/grid?page=1&et=camp"}>
            <Button variant={`secondary`}>
              <TentIcon />
              Camps
            </Button>
          </Link>

          <Link href={"/events/grid?page=1&et=training"}>
            <Button>
              <DumbbellIcon />
              Trainings
            </Button>
          </Link>

          <Link href={"/events/grid?page=1&et=clinic"}>
            <Button variant={`secondary`}>
              <AwardIcon />
              Clinics
            </Button>
          </Link>

          <Link href={"/events/grid?page=1&et=friendly_game"}>
            <Button>
              <HandshakeIcon />
              Friendly games
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 my-12">
        <p className="w-full md:w-2/3">
          Want to see what's happening near you — or plan ahead? Use the
          calendar to browse events by date, or jump into the map to find events
          in your area at a glance.
        </p>
        <div className="flex flex-col gap-4 md:gap-8">
          <Link href={"/events/calendar"}>
            <Button>
              <CalendarIcon />
              View calendar
            </Button>
          </Link>

          <Link href={"/events/map"}>
            <Button className="w-full">
              <MapPinIcon /> View map
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
