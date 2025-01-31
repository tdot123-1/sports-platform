"use client";

import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SidebarLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarLinksProps {
  links: SidebarLink[];
}

const SidebarLinks = ({ links }: SidebarLinksProps) => {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();
  return (
    <>
      {links.map((link) => (
        <SidebarMenuItem key={link.name}>
          <SidebarMenuButton
            asChild
            className={clsx({
              "bg-zinc-200 font-semibold": pathname === link.href,
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
  );
};

export default SidebarLinks;
