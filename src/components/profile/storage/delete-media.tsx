"use client";

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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteMediaButtonProps {
  filePath: string;
  eventId: string;
  serverAction: (
    filePath: string,
    eventId: string
  ) => Promise<{
    message: string;
    success: boolean;
  }>;
}

const DeleteMediaButton = ({
  serverAction,
  eventId,
  filePath,
}: DeleteMediaButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await serverAction(filePath, eventId);

      if (!result.success) {
        throw new Error(`Failure to delete image: ${result.message}`);
      }

      toast.info("Image deleted!");
    } catch (error) {
      console.error("Error deleting file: ", error);
      toast.error("Failed to delete image", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isLoading} className="p-1" variant={`ghost`}>
            <Trash2Icon />
            <span className="hidden" hidden>
              Delete Image
            </span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              image from the database.
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

export default DeleteMediaButton;
