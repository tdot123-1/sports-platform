import {
  BookUserIcon,
  CookieIcon,
  DatabaseIcon,
  GridIcon,
  HeartHandshakeIcon,
  HelpCircle,
  HelpCircleIcon,
  Home,
  HomeIcon,
  LogInIcon,
  MapIcon,
  MessageCircle,
  PlusCircleIcon,
  Table2Icon,
  Trophy,
  TrophyIcon,
  UserCircleIcon,
  UserIcon,
  UserPlus2Icon,
} from "lucide-react";

export const baseNavLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  // {
  //   name: "Events",
  //   href: "/events",
  //   icon: Trophy,
  // },
  {
    name: "About",
    href: "/about",
    icon: HelpCircle,
  },
];

export const eventSubLinks = [
  {
    name: "Grid view",
    href: "/events/grid",
    icon: GridIcon,
  },
  {
    name: "Table view",
    href: "/events/table",
    icon: Table2Icon,
  },
  {
    name: "Map view",
    href: "/events/map",
    icon: MapIcon,
  },
];

export const profileNavLinks = [
  {
    name: "My Profile",
    href: "/profile",
    icon: UserIcon,
  },
  {
    name: "My Events",
    href: "/profile/events",
    icon: DatabaseIcon,
  },
  {
    name: "Create Event",
    href: "/profile/events/create",
    icon: PlusCircleIcon,
  },
];

export const loggedOutNavLinks = [
  {
    name: "Login",
    href: "/login",
    icon: LogInIcon,
  },
  {
    name: "Signup",
    href: "/signup",
    icon: UserPlus2Icon,
  },
];

export const infoNavLinks = [
  {
    name: "Privacy",
    href: "/info/privacy",
    icon: CookieIcon,
  },
  {
    name: "Contact",
    href: "/info/contact",
    icon: MessageCircle,
  },
  {
    name: "Support",
    href: "/info/support",
    icon: HeartHandshakeIcon,
  },
];
