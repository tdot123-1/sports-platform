import { createClient } from "@/lib/supabase/server";
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
        <h1>Profile</h1>
        <p>Hello {data.user.email}</p>
        <div className="flex flex-col gap-1">
          <Link href={`/profile/events`}>To my events</Link>
          <Link href={`/profile/events/create`}>Create event</Link>
        </div>
      </section>
    </>
  );
};

export default Page;
