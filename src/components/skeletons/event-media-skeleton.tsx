import { ExternalLinkIcon, UploadIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UploadMediaSkeleton = ({
  label,
  instruction,
}: {
  label: string;
  instruction: string;
}) => {
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className="text-muted-foreground text-sm">{instruction}</p>
        <Input type="file" disabled />
      </div>

      <Button disabled>
        <div className="flex justify-start items-start gap-1">
          <UploadIcon />
          <span className="hidden md:block">Upload</span>
        </div>
      </Button>
    </div>
  );
};

const AddLogoSkeleton = () => {
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
            <>
              <p className="flex underline underline-offset-2 text-sm text-muted-foreground">
                <span>Click here to view full image</span>
                <ExternalLinkIcon size={14} />
              </p>
              <div className="py-3">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </>
          </div>
        </div>
        <div>
          <UploadMediaSkeleton
            instruction="Uploading a new file will delete any existing logo for this event"
            label="Upload logo"
          />
        </div>
      </div>
    </>
  );
};

const AddImageSkeleton = () => {
  return (
    <>
      <div className="border rounded-md shadow-md p-6 w-full max-w-screen-lg">
        <div>
          <h3 className="font-mono text-primary text-lg">Event images</h3>
          <Separator />
          <p className="text-sm text-muted-foreground italic">
            Add up to 3 images to your event.
          </p>
          <div className="py-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`src-${i}`} className="w-full aspect-square">
                  <Skeleton className="w-full h-full rounded-md" />
                </div>
              ))}
            </div>
            <div className="mt-4">
              {Array.from({ length: 3 }).map((img, i) => (
                <p
                  key={`href-${i}`}
                  className="flex underline underline-offset-2 text-sm text-muted-foreground mb-1"
                >
                  <span>Click here to view full image {i + 1}</span>
                  <ExternalLinkIcon size={14} />
                </p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <UploadMediaSkeleton
            label="Upload image"
            instruction="Add an image to your event"
          />
        </div>
      </div>
    </>
  );
};

const EventMediaSkeleton = () => {
  return (
    <>
      <section>
        <AddLogoSkeleton />
      </section>
      <section>
        <AddImageSkeleton />
      </section>
    </>
  );
};

export default EventMediaSkeleton;
