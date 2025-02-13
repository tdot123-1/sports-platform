import {
  FilterOptions,
  SortOptions,
  SportsEvent,
  SportsEventTypeMap,
} from "@/lib/types";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { fetchAllEvents } from "@/lib/data/events/data";
import { convertFetchedEvent } from "@/lib/utils";
import Link from "next/link";
import ViewDetailsButton from "./view-details-button";

interface EventsTableProps {
  userId?: string;
  currentPage?: number;
  searchQuery?: string;
  filter?: FilterOptions;
  sort?: SortOptions;
  priceFilter?: number;
}

const EventsTable = async ({
  userId,
  currentPage = 1,
  searchQuery,
  filter,
  sort,
  priceFilter,
}: EventsTableProps) => {
  // test skeleton
  //   await new Promise((resolve) => setTimeout(resolve, 5000));

  const fetchedEvents = await fetchAllEvents(
    currentPage,
    userId,
    searchQuery,
    filter,
    sort,
    priceFilter
  );

  const events: SportsEvent[] = fetchedEvents.map((event) =>
    convertFetchedEvent(event)
  );

  const renderArrayField = (field: string[]) => {
    if (!field.length) return;

    if (field.length === 1) {
      return `${field[0]}`;
    }
    if (field.length === 2) {
      return `${field[0]}, ${field[1]}`;
    }

    return `${field[0]}, ${field[1]}, ...+${field.length - 2}`;
  };

  return (
    <>
      <Table className="my-6">
        <TableCaption>All events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Details</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>What</TableHead>
            <TableHead>When</TableHead>
            <TableHead>Where</TableHead>
            <TableHead>For: </TableHead>
            <TableHead>Age groups(s)</TableHead>
            <TableHead>Skill level(s)</TableHead>
            <TableHead>Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <ViewDetailsButton
                    eventId={event.id}
                    size={`sm`}
                    innerText="View"
                  />
                </TableCell>
                <TableCell>{event.event_name}</TableCell>
                <TableCell>{SportsEventTypeMap[event.event_type]}</TableCell>
                <TableCell>
                  {event.start_date
                    ? event.start_date.toLocaleDateString()
                    : "TBD"}
                </TableCell>
                <TableCell>
                  {event.address_city} {event.address_country}
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{renderArrayField(event.target_age)}</TableCell>
                <TableCell>
                  {event.target_level
                    ? renderArrayField(event.target_level)
                    : "N/A"}
                </TableCell>
                <TableCell>{event.target_gender}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="py-4 text-center">
                No events found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default EventsTable;
