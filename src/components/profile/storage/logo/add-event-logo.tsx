import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkIcon } from "lucide-react";
import UploadMediaForm from "../upload-media";
import {
  deleteLogoFromStorage,
  uploadLogo,
} from "@/lib/actions/storage/actions";

import DeleteMediaButton from "../delete-media";
import UploadCompressMedia from "../upload-compress-media";

const AddEventLogo = async ({
  event_logo_url,
  eventId,
}: {
  event_logo_url: string | null;
  eventId: string;
}) => {
  return (
    <>
      <div className="border rounded-md shadow-md p-6 w-full max-w-screen-lg">
        <div>
          <h3 className="font-mono text-primary text-lg">Event logo</h3>
          <Separator />
          <p className="text-sm text-muted-foreground italic">
            Add a logo to your event.
          </p>
          <div className="flex flex-col items-center py-3">
            <h4>Current logo:</h4>
            {event_logo_url ? (
              <>
                <a
                  className="flex underline underline-offset-2 text-sm text-muted-foreground"
                  href={event_logo_url}
                  target="_blank"
                >
                  <span>Click here to view full image</span>
                  <ExternalLinkIcon size={14} />
                </a>
                <div className="relative py-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary opacity-55">
                      Sports
                    </AvatarFallback>
                    <AvatarImage src={event_logo_url} />
                  </Avatar>

                  <div className="absolute bottom-0 left-10">
                    <DeleteMediaButton
                      filePath={event_logo_url!}
                      eventId={eventId}
                      serverAction={deleteLogoFromStorage}
                    />
                  </div>
                </div>
              </>
            ) : (
              <p className="text-xs italic text-muted-foreground mt-3">
                No logo uploaded yet.
              </p>
            )}
          </div>
        </div>
        <div>
          <UploadCompressMedia
            eventId={eventId}
            formLabel="Upload logo"
            formInstruction="Uploading a new file will delete any existing logo for this event"
            toastSuccess="A new logo was added to your event!"
            name="event_logo"
            previousImgUrl={event_logo_url}
          />
          {/** Allowed files: *.jpg, *.jpeg, *.svg, no larger than 1MB */}
          {/* <UploadMediaForm
            serverAction={uploadLogo}
            eventId={eventId}
            formLabel="Upload logo"
            formInstruction="Uploading a new file will delete any existing logo for this event"
            toastDescription="A new logo was added to your event!"
            name="event_logo"
            previousImgUrl={event_logo_url}
          /> */}
        </div>
      </div>
    </>
  );
};

export default AddEventLogo;
