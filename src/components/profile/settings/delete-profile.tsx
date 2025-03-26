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
import { deleteUserProfile } from "@/lib/actions/profile/actions";
import { UserXIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteProfile = () => {
  // states for loading and dialog state
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const deleteSuccess = await deleteUserProfile();

    if (!deleteSuccess) {
      console.error("Unexpected error deleting profile");
      toast.error("Error deleting profile, please try again later.");
    } 
    // if delete was success -> user will be redirected 
    
    setIsLoading(false);
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant={`destructive`} disabled={isLoading}>
            <UserXIcon /> Delete profile
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Deleting your profile will also permanently delete all events
              created from this profile. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
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

export default DeleteProfile;
