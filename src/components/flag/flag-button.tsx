"use client";

import { FlagIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const FlagEventButton = ({ eventId }: { eventId: string }) => {
  console.log(eventId);

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
            <Label htmlFor="report_details">Details</Label>
            <Textarea
              id="report_details"
              name="report_details"
              placeholder="Describe why you reported this event..."
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FlagEventButton;
