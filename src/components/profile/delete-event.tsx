"use client";

import { Trash2Icon } from "lucide-react";
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
import { Button } from "../ui/button";
import { deleteEvent } from "@/lib/actions/events/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteEventProps {
  eventId: string;
}

const DeleteEvent = ({ eventId }: DeleteEventProps) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setError("");
    setIsLoading(true);
    try {
      const result = await deleteEvent(eventId);
      if (result.success) {
        router.replace("/profile/events");
        setTimeout(() => {
          toast("Event deleted", {
            description: "Your event has been deleted from the database",
          });
        }, 100);
      } else {
        setError(result.message || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Error deleting event: ", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AlertDialog>
        <div className="flex flex-col justify-end items-end">
          <AlertDialogTrigger asChild>
            <Button disabled={isLoading} variant={`outline`}>
              <div className="flex justify-start items-start gap-1">
                <Trash2Icon />
                <span className="hidden md:block">Delete</span>
              </div>
            </Button>
          </AlertDialogTrigger>
          {error && (
            <p className="text-sm mt-2 text-destructive italic">{error}</p>
          )}
        </div>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              event from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoading}
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteEvent;
