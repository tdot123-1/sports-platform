import { createClient } from "@/lib/supabase/server";
import LogoutButton from "../auth/logout-button";
import Link from "next/link";
import AppSideBarTrigger from "../nav/app-sidebar-trigger";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="p-6 bg-zinc-200 flex justify-center relative">
      <AppSideBarTrigger />
      <h1 className="text-center">Sports Platform</h1>
      <div></div>
    </header>
  );
};

export default Header;
