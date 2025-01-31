import {
  BookUserIcon,
  DatabaseIcon,
  HelpCircle,
  HelpCircleIcon,
  Home,
  HomeIcon,
  LogInIcon,
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
