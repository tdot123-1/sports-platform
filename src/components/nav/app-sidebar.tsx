import { Sidebar, SidebarContent } from "../ui/sidebar";
import AppSidebarContent from "./app-sidebar-content";

const AppSideBar = () => {
  return (
    <Sidebar variant={`sidebar`} collapsible="icon">
      <SidebarContent className="font-sans">
        <AppSidebarContent />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
