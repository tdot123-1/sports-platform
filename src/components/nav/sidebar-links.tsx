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
import {
  baseNavLinks,
  infoNavLinks,
  loggedOutNavLinks,
  profileNavLinks,
} from "./nav-links";
import LogoutMenuItem from "../auth/logout-menu-item";

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
                    "bg-zinc-100":
                      pathname === link.href ||
                      (link.href === "/events/grid" &&
                        pathname.startsWith("/events")),
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
            {/* <SidebarEventsSub
              pathname={pathname}
              isMobile={isMobile}
              toggleSidebar={toggleSidebar}
            /> */}
            {/* <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={clsx({
                  "bg-zinc-100": pathname === "/events/favorites",
                })}
                onClick={() => isMobile && toggleSidebar()}
              >
                <Link href={`/events/favorites`}>
                  <HeartIcon />
                  Favorites
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem> */}
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
      <SidebarGroup>
        <SidebarGroupLabel>Info</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {infoNavLinks.map((link) => (
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
    </>
  );
};

export default SidebarLinks;
