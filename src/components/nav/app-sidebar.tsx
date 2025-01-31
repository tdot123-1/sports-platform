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
        <AppSidebarContent />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
