import {
  CalendarIcon,
  CookieIcon,
  DatabaseIcon,
  GridIcon,
  HeartHandshakeIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  LogInIcon,
  MapIcon,
  MessageCircle,
  PlusCircleIcon,
  Table2Icon,
  TrophyIcon,
  UserIcon,
  UserPlus2Icon,
} from "lucide-react";

export const baseNavLinks = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },

  {
    name: "About",
    href: "/about",
    icon: HelpCircleIcon,
  },
  {
    name: "Events",
    href: "/events/grid",
    icon: TrophyIcon,
  },
  {
    name: "Favorites",
    href: "/events/favorites",
    icon: HeartIcon,
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
  {
    name: "Calendar view",
    href: "/events/calendar",
    icon: CalendarIcon,
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
    active: true,
  },
  {
    name: "Contact",
    href: "/info/contact",
    icon: MessageCircle,
    active: true,
  },
  {
    name: "Support Us",
    href: "/info/support",
    icon: HeartHandshakeIcon,
    active: false,
  },
];
