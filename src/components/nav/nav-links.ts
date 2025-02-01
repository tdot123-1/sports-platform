import {
  BookUserIcon,
  CookieIcon,
  DatabaseIcon,
  HeartHandshakeIcon,
  HelpCircle,
  HelpCircleIcon,
  Home,
  HomeIcon,
  LogInIcon,
  MessageCircle,
  PlusCircleIcon,
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
  {
    name: "Events",
    href: "/events",
    icon: Trophy,
  },
  {
    name: "About",
    href: "/about",
    icon: HelpCircle,
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
