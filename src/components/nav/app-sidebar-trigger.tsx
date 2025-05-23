"use client";

import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const AppSideBarTrigger = () => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button onClick={toggleSidebar} size={`icon`} variant={`default`} className="p-1 my-0.5 absolute left-1 top-2 hover:text-sidebar">
      <p hidden className="hidden">
        Toggle sidebar
      </p>
      {open ? <SidebarCloseIcon size={24} /> : <SidebarOpenIcon size={24} />}
    </Button>
  );
};

export default AppSideBarTrigger;
