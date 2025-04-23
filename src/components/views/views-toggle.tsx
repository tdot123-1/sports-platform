import { CalendarIcon, GridIcon, MapIcon, Table2Icon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const ViewsToggle = ({
  currentView,
}: {
  currentView: "grid" | "table" | "map" | "calendar";
}) => {
  return (
    <>
      <div className="bg-sidebar w-fit p-2 rounded-md">
        <ToggleGroup type="single" variant={`outline`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/events/grid"}>
                  <ToggleGroupItem
                    value="grid"
                    aria-label="Grid view"
                    data-state={currentView === "grid" ? "on" : "off"}
                  >
                    <GridIcon />
                  </ToggleGroupItem>
                </Link>
              </TooltipTrigger>
              {currentView !== "grid" && (
                <TooltipContent className="bg-muted border border-input text-accent-foreground">
                  <p>Toggle grid view</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/events/table"}>
                  <ToggleGroupItem
                    value="table"
                    aria-label="Table view"
                    data-state={currentView === "table" ? "on" : "off"}
                  >
                    <Table2Icon />
                  </ToggleGroupItem>
                </Link>
              </TooltipTrigger>
              {currentView !== "table" && (
                <TooltipContent className="bg-muted border border-input text-accent-foreground">
                  <p>Toggle table view</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/events/map"}>
                  <ToggleGroupItem
                    value="map"
                    aria-label="Map view"
                    data-state={currentView === "map" ? "on" : "off"}
                  >
                    <MapIcon />
                  </ToggleGroupItem>
                </Link>
              </TooltipTrigger>
              {currentView !== "map" && (
                <TooltipContent className="bg-muted border border-input text-accent-foreground">
                  <p>Toggle map view</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={"/events/calendar"}>
                  <ToggleGroupItem
                    value="calendar"
                    aria-label="Calendar view"
                    data-state={currentView === "calendar" ? "on" : "off"}
                  >
                    <CalendarIcon />
                  </ToggleGroupItem>
                </Link>
              </TooltipTrigger>
              {currentView !== "calendar" && (
                <TooltipContent className="bg-muted border border-input text-accent-foreground">
                  <p>Toggle calendar view</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </ToggleGroup>
      </div>
    </>
  );
};

export default ViewsToggle;
