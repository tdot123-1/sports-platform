import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <section className="px-4">
        <h1 className="text-2xl font-mono text-primary mt-4">My Profile</h1>
        <p className="my-6">
          <span className="font-semibold">Logged in as:</span>{" "}
          <span className="text-muted-foreground text-sm">
            {data.user.email || `user`}
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          <article className="border border-muted shadow-md rounded-md p-4">
            <h2 className="text-xl font-mono text-primary">My Events</h2>
            <p className="text-sm text-muted-foreground my-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
              rem porro assumenda ad adipisci ullam iusto vitae, dolor ipsa
              deleniti repudiandae eveniet necessitatibus. Excepturi quos fugit
              quo temporibus neque animi!
            </p>

            <Link href={`/profile/events`}>
              <Button variant={`outline`}>
                <span>To my events</span>
                <ArrowRightIcon />
              </Button>
            </Link>
          </article>
          <article className="border border-muted shadow-md rounded-md p-4">
            <h2 className="text-xl font-mono text-primary">Create Event</h2>
            <p className="text-sm text-muted-foreground my-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
              rem porro assumenda ad adipisci ullam iusto vitae, dolor ipsa
              deleniti repudiandae eveniet necessitatibus. Excepturi quos fugit
              quo temporibus neque animi!
            </p>

            <Link href={`/profile/events/create`}>
              <Button variant={`outline`}>
                <span>Create Event</span>
                <ArrowRightIcon />
              </Button>
            </Link>
          </article>
        </div>
      </section>
    </>
  );
};

export default Page;
