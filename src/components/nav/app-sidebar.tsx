import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import AppSidebarContent from "./app-sidebar-content";
import { baseNavLinks } from "./nav-links";
import SidebarLinks from "./sidebar-links";

const AppSideBar = () => {
  return (
    <Sidebar variant={`sidebar`} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarLinks links={baseNavLinks} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <AppSidebarContent />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
