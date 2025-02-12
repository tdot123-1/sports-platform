import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const EventsTableSkeleton = () => {
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
            <TableHead>For:</TableHead>
            <TableHead>Age group(s)</TableHead>
            <TableHead>Skill level(s)</TableHead>
            <TableHead>Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Button disabled size={`sm`}>
                  View
                </Button>
              </TableCell>
              <TableCell>
                <Skeleton className="w-28 h-6 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-28 h-6 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-28 h-6 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-28 h-6 rounded-md" />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Skeleton className="w-28 h-6 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-28 h-6 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-28 h-6 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EventsTableSkeleton;
