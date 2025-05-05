import { CalendarIcon, GridIcon, MapPinIcon, Table2Icon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

const ViewsToggle = ({
  currentView,
}: {
  currentView: "grid" | "table" | "map" | "calendar";
}) => {
  return (
    <>
      <div
        className={cn(
          "flex justify-center bg-muted pt-1",
          (currentView === "calendar" || currentView === "map") && "shadow-md"
        )}
      >
        <div className="p-2 w-fit">
          <ToggleGroup type="single" variant={`outline`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={"/events/grid"}>
                    <ToggleGroupItem
                      className="bg-primary text-sidebar-primary-foreground"
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
                      className="bg-primary text-sidebar-primary-foreground"
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
                      className="bg-primary text-sidebar-primary-foreground"
                      value="map"
                      aria-label="Map view"
                      data-state={currentView === "map" ? "on" : "off"}
                    >
                      <MapPinIcon />
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
                      className="bg-primary text-sidebar-primary-foreground"
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
      </div>
    </>
  );
};

export default ViewsToggle;
