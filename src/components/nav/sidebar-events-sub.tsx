"use client";

import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { eventSubLinks } from "./nav-links";
import clsx from "clsx";
import { ChevronDown, ChevronRight, TrophyIcon } from "lucide-react";
import { useState } from "react";

const SidebarEventsSub = ({
  pathname,
  isMobile,
  toggleSidebar,
}: {
  pathname: string;
  isMobile: boolean;
  toggleSidebar: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={() => setIsOpen((prev) => !prev)}
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={clsx({
                "bg-zinc-100":
                  pathname.startsWith("/events") &&
                  !pathname.endsWith("/favorites"),
              })}
            >
              <TrophyIcon />
              <span>Events</span>

              {isOpen ? <ChevronDown /> : <ChevronRight />}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {eventSubLinks.map((link) => (
                <SidebarMenuSubItem key={link.name}>
                  <SidebarMenuSubButton
                    asChild
                    className={clsx({
                      "bg-zinc-100": pathname === link.href,
                    })}
                    onClick={() => isMobile && toggleSidebar()}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      {link.name}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </>
  );
};

export default SidebarEventsSub;
