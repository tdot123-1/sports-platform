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
    <header className="sticky top-0 p-4 bg-orange-400 z-10 flex justify-center">
      <AppSideBarTrigger />
      <h1 className="text-center text-xl font-bold">Sports Platform</h1>
    </header>
  );
};

export default Header;
