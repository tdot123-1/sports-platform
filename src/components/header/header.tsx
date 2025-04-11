// import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import AppSideBarTrigger from "../nav/app-sidebar-trigger";

const Header = () => {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 p-4 bg-basket-header z-10 flex justify-center">
      <AppSideBarTrigger />
      <div className="flex items-end gap-1">
        <div className="w-10 h-10">
          <Image
            src={`/high-five.png`}
            alt="app-logo"
            width={512}
            height={512}
          />
        </div>
        <h1 className="text-center text-xl font-bold font-mono">Hi-Fives</h1>
      </div>
    </header>
  );
};

export default Header;
