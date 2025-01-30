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
      <h1>Profile</h1>
      <p>Hello {data.user.email}</p>
      <p>Events created</p>
      <p>Create event</p>
      <p>Edit event</p>
    </>
  );
};

export default Page;
