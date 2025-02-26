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
import { convertFetchedEvent, renderArrayField } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import ViewDetailsButton from "./details-button";

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

  const events: SportsEvent[] = await Promise.all(
    fetchedEvents.map(convertFetchedEvent)
  );

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
                  {/* <Link href={`/events/${event.id}`}>
                    <Button size={`sm`}>View</Button>
                  </Link> */}
                  <ViewDetailsButton
                    nextUrl={`/events/${event.id}`}
                    innerText="View"
                  />
                </TableCell>
                <TableCell className="max-w-32 overflow-hidden text-ellipsis text-nowrap">
                  {event.event_name}
                </TableCell>
                <TableCell>{SportsEventTypeMap[event.event_type]}</TableCell>
                <TableCell className="text-nowrap">
                  {event.start_date
                    ? format(event.start_date, "LLL dd, y")
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
