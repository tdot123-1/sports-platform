import Image from "next/image";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import AppSidebarContent from "./app-sidebar-content";

const AppSideBar = () => {
  return (
    <Sidebar variant={`sidebar`} collapsible="icon">
      <SidebarContent className="font-sans">
        <div className="w-40 p-2 group-data-[collapsible=icon]:hidden mx-auto">
          <Image
            src={"/logo-compressed.png"}
            alt="Hi-Fives logo"
            width={13024}
            height={5171}
          />
        </div>
        <AppSidebarContent />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
