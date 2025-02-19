import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { fetchEventLogo } from "@/lib/data/storage/data";
import { ExternalLinkIcon, Trash2Icon } from "lucide-react";
import UploadMediaForm from "../upload-media";
import { uploadLogo } from "@/lib/actions/storage/actions";
import DeleteLogoButton from "../delete-logo";

const AddEventLogo = async ({
  event_logo_url,
  eventId,
}: {
  event_logo_url: string | null;
  eventId: string;
}) => {
  const logoPublicUrl = event_logo_url
    ? await fetchEventLogo(event_logo_url)
    : null;

  return (
    <>
      <div className="border rounded-md shadow-md p-6 w-fit">
        <div>
          <h3 className="font-mono text-primary text-lg">Upload new logo</h3>
          <Separator />
          <p className="text-sm text-muted-foreground italic">
            Add a logo to your event to be displayed in the top right corner.
          </p>
          <div className="flex flex-col items-center py-3">
            <h4>Current logo:</h4>
            {logoPublicUrl ? (
              <>
                <a
                  className="flex underline underline-offset-2 text-sm text-muted-foreground"
                  href={logoPublicUrl}
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
                    <AvatarImage src={logoPublicUrl} />
                  </Avatar>
                  {/* <Button className="absolute bottom-0 left-10 p-1" variant={`ghost`}>
                    <Trash2Icon />
                  </Button> */}
                  <div className="absolute bottom-0 left-10">
                    <DeleteLogoButton
                      eventId={eventId}
                      event_logo_url={event_logo_url!}
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
          {/** Allowed files: *.jpg, *.jpeg, *.svg, no larger than 2MB */}
          <UploadMediaForm
            serverAction={uploadLogo}
            eventId={eventId}
            formLabel="Upload logo"
            formInstruction="Uploading a new file will delete any existing logo for this event"
            toastDescription="A new logo was added to your event!"
            name="event_logo"
            previousImgUrl={event_logo_url}
          />
        </div>
      </div>
    </>
  );
};

export default AddEventLogo;
