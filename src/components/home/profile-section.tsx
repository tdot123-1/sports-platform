import { UserPlus2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const ProfileSection = () => {
  return (
    <section className="px-8 py-16 bg-muted">
      <h2 className="text-2xl md:text-3xl font-mono font-semibold text-primary">
        Create your events
      </h2>
      <div className="flex items-center gap-20">
        <div className="w-full md:w-2/3 lg:w-1/2 my-8 text-base md:text-lg">
          <p className="mb-4">
            Whether you&apos;re a coach, trainer, or event organizer, you can
            share your events with just a few clicks. Add key details, upload
            images, and make your event stand out to the right audience.
          </p>
          {/* <p>
        Become part of a growing hub where athletes and teams can discover
        what's happening in their area. Sign up for a free account and share
        your events.
      </p> */}
          <p>
            Join a growing hub where athletes and teams discover what&apos;s
            happening nearby. Create a free profile and start posting your
            events today.
          </p>
        </div>
        <div className="w-96 hidden md:block">
          <Image
            src={"/profile-section-basket.jpg"}
            alt="Basketball coach planning an event"
            width={5760}
            height={3870}
            className="rounded-md"
          />
        </div>
      </div>

      <Link href={"/signup"}>
        <Button>
          <UserPlus2Icon /> Create your profile
        </Button>
      </Link>
    </section>
  );
};

export default ProfileSection;
