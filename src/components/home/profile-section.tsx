import { UserPlus2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const ProfileSection = () => {
  return (
    <section className="px-4 py-24 my-12 bg-muted">
      <h2 className="text-2xl md:text-3xl font-mono font-semibold text-primary">
        Create your events
      </h2>
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
          happening nearby. Create a free profile and start posting your events
          today.
        </p>
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
