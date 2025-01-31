import { createClient } from "@/lib/supabase/server";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import SidebarLinks from "./sidebar-links";
import { loggedOutNavLinks, profileNavLinks } from "./nav-links";
import LogoutButton from "../auth/logout-button";

const AppSidebarContent = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <>
      {data.user ? (
        <>
          <SidebarLinks authenticated />
          
        </>
      ) : (
        <SidebarLinks authenticated={false} />
      )}
    </>
  );
};

export default AppSidebarContent;
