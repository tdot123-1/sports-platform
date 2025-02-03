import EventsList from "@/components/events/events-list";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
      <h1>My Events</h1>
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList userId={data.user.id} />
      </Suspense>
    </>
  );
};

export default Page;
