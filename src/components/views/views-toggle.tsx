import { CalendarIcon, GridIcon, MapIcon, Table2Icon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import Link from "next/link";

const ViewsToggle = ({
  currentView,
}: {
  currentView: "grid" | "table" | "map" | "calendar";
}) => {
  return (
    <>
      <div className="bg-sidebar w-fit p-2 rounded-md">
        <ToggleGroup type="single" variant={`outline`}>
          <Link href={"/events/grid"}>
            <ToggleGroupItem
              value="grid"
              aria-label="Grid view"
              data-state={currentView === "grid" ? "on" : "off"}
            >
              <GridIcon />
            </ToggleGroupItem>
          </Link>

          <Link href={"/events/table"}>
            <ToggleGroupItem
              value="table"
              aria-label="Table view"
              data-state={currentView === "table" ? "on" : "off"}
            >
              <Table2Icon />
            </ToggleGroupItem>
          </Link>
          <Link href={"/events/map"}>
            <ToggleGroupItem
              value="map"
              aria-label="Map view"
              data-state={currentView === "map" ? "on" : "off"}
            >
              <MapIcon />
            </ToggleGroupItem>
          </Link>

          <Link href={"/events/calendar"}>
            <ToggleGroupItem
              value="calendar"
              aria-label="Calendar view"
              data-state={currentView === "calendar" ? "on" : "off"}
            >
              <CalendarIcon />
            </ToggleGroupItem>
          </Link>
        </ToggleGroup>
      </div>
    </>
  );
};

export default ViewsToggle;
