import { SportsEventType } from "@/lib/types";
import {
  AwardIcon,
  DumbbellIcon,
  HandshakeIcon,
  MedalIcon,
  TentIcon,
  TrophyIcon,
} from "lucide-react";

export const getFallbackLogo = (event_type: SportsEventType) => {
  switch (event_type) {
    case "camp":
      return <TentIcon />;
    case "clinic":
      return <AwardIcon />;
    case "friendly_game":
      return <HandshakeIcon />;
    case "tournament":
      return <MedalIcon />;
    case "training":
      return <DumbbellIcon />;
    default:
      return <TrophyIcon />;
  }
};
