import { createClient } from "@/lib/supabase/server";
import LogoutButton from "../auth/logout-button";
import Link from "next/link";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="p-6 bg-zinc-200 flex justify-between">
      {user ? (
        <div>
          <h1>Logged in</h1>
          <Link href={`/profile`}>To Profile</Link>
          <LogoutButton />
        </div>
      ) : (
        <div>
          <h1>Logged out</h1>
          <Link href={`/login`}>To Login</Link>
          <Link href={`/signup`}>To Signup</Link>
        </div>
      )}
      <div>
        <Link href={`/events`}>To Events</Link>
        <Link href={`/about`}>To About</Link>
      </div>
    </header>
  );
};

export default Header;
