import EventsList from "@/components/events/events-list";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
      <h1>My Events</h1>
      <EventsList userId={data.user.id} />
    </>
  );
};

export default Page;
