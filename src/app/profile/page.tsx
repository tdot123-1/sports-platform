import ProfileSettings from "@/components/profile/settings/profile-settings";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

const Page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // find out auth providers to determine profile settings
  const providers: string[] = data.user.app_metadata.providers;

  // console.log("PROVIDERS: ", providers);

  return (
    <>
      <section className="px-4 bg-basket-background min-h-dvh py-8">
        <h1 className="text-3xl font-mono text-primary">
          My Profile
        </h1>
        <p className="mt-6">
          <span className="font-semibold">Logged in as:</span>{" "}
          <span className="text-muted-foreground text-sm">
            {/* first check metadata to get correct email, else check user.email */}
            {data.user.user_metadata.email || data.user.email || `user`}
          </span>
        </p>
        <div className="ml-auto w-fit mt-4">
          <ProfileSettings providers={providers} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <article className="bg-white border border-muted shadow-md rounded-md p-4">
            <h2 className="text-xl font-mono text-basket font-medium">
              My Events
            </h2>
            <p className="text-sm text-muted-foreground my-4">
              Review and manage all the events you&apos;ve created in one place.
              Update details, add and remove images, or delete events as needed
            </p>

            <Link href={`/profile/events`}>
              <Button variant={`outline`}>
                <span>To my events</span>
                <ArrowRightIcon />
              </Button>
            </Link>
          </article>
          <article className="bg-white border border-muted shadow-md rounded-md p-4">
            <h2 className="text-xl font-mono text-basket font-medium">
              Create Event
            </h2>
            <p className="text-sm text-muted-foreground my-4">
              Ready to post something new? Use the form to create a new event
              within minutes!
            </p>

            <Link href={`/profile/events/create`}>
              <Button variant={`outline`}>
                <span>Create Event</span>
                <ArrowRightIcon />
              </Button>
            </Link>
          </article>
        </div>
        {/* <div className="my-16 flex flex-col gap-4 w-fit">
          <Button variant={`secondary`}>
            <UserCogIcon />
            Profile settings
          </Button>

          <Button variant={`destructive`}>
            <UserXIcon /> Delete profile
          </Button>
        </div> */}
      </section>
    </>
  );
};

export default Page;
