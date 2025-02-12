import { FilterOptions, SortOptions, SportsEvent } from "@/lib/types";
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
  // await new Promise((resolve) => setTimeout(resolve, 5000));

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
            <TableHead>For</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length ? (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Link href={`/events/${event.id}`}>
                    <Button size={`sm`}>View</Button>
                  </Link>
                </TableCell>
                <TableCell>{event.event_name}</TableCell>
                <TableCell>{event.event_type}</TableCell>
                <TableCell>
                  {event.start_date
                    ? event.start_date.toLocaleDateString()
                    : "TBD"}
                </TableCell>
                <TableCell>
                  {event.address_city} {event.address_country}
                </TableCell>
                <TableCell>Age group/skill level/gender</TableCell>
              </TableRow>
            ))
          ) : (
            <div className="w-full mt-16 text-center">No events found!</div>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default EventsTable;
