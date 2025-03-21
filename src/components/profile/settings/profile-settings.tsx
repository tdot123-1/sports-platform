import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BookUserIcon,
  KeyRoundIcon,
  MailIcon,
  UserCogIcon,
} from "lucide-react";
import DeleteProfile from "./delete-profile";

const ProfileSettings = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={`secondary`}>
            <UserCogIcon />
            Profile settings
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
            <DialogDescription>Adjust your profile settings</DialogDescription>
            <div className="py-3">
              <ul className="flex flex-col gap-4 justify-center items-center">
                <li>
                  <Button variant={`secondary`}>
                    <KeyRoundIcon /> Change password
                  </Button>
                </li>
                <li>
                  <Button variant={`secondary`}>
                    <MailIcon /> Change email
                  </Button>
                </li>
                <li>
                  <Button variant={`secondary`}>
                    <BookUserIcon />
                    Invite user
                  </Button>
                </li>
                <li>
                  <DeleteProfile />
                </li>
              </ul>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileSettings;
