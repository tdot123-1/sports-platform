"use client";

import { FlagIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import ReportEventForm from "./report-event-form";

const FlagEventButton = ({ eventId }: { eventId: string }) => {
  // send reasons for report in form, along with event id (?)
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <FlagIcon />
            <span className="hidden md:block">Report</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report this event</AlertDialogTitle>
            <AlertDialogDescription>
              Please let us know if there is anything offensive, suspicious, or
              otherwise inappropriate about the content in this event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <ReportEventForm eventId={eventId} />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FlagEventButton;
