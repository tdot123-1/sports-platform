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
      <SidebarGroup>
        <SidebarGroupLabel>Profile</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {data.user ? (
              <>
                <SidebarLinks links={profileNavLinks} />
                <LogoutButton />
              </>
            ) : (
              <SidebarLinks links={loggedOutNavLinks} />
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default AppSidebarContent;
