// import { createClient } from "@/lib/supabase/server";
import AppSideBarTrigger from "../nav/app-sidebar-trigger";

const Header = () => {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 p-4 bg-primary z-10 flex justify-center">
      <AppSideBarTrigger />
      <h1 className="text-center text-xl font-bold font-mono">
        Sports Platform
      </h1>
    </header>
  );
};

export default Header;
