"use client";

import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LogOutIcon, LucideIcon } from "lucide-react";
import { baseNavLinks, loggedOutNavLinks, profileNavLinks } from "./nav-links";
import { Button } from "../ui/button";
import LogoutButton from "../auth/logout-button";
import LogoutMenuItem from "../auth/logout-menu-item";

interface SidebarLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarLinksProps {
  authenticated: boolean;
}

const SidebarLinks = ({ authenticated }: SidebarLinksProps) => {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {baseNavLinks.map((link) => (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton
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
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Profile</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {authenticated ? (
              <>
                {profileNavLinks.map((link) => (
                  <SidebarMenuItem key={link.name}>
                    <SidebarMenuButton
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
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <LogoutMenuItem />
              </>
            ) : (
              <>
                {loggedOutNavLinks.map((link) => (
                  <SidebarMenuItem key={link.name}>
                    <SidebarMenuButton
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
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default SidebarLinks;
