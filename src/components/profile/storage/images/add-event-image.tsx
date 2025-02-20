import { uploadImage } from "@/lib/actions/storage/actions";
import UploadMediaForm from "../upload-media";
import { Separator } from "@/components/ui/separator";
import { EventImage } from "@/lib/types";
import { fetchImagePublicUrls } from "@/lib/data/storage/data";
import Image from "next/image";
import DeleteLogoButton from "../delete-logo";

const AddEventImage = async ({
  eventId,
  event_images,
}: {
  eventId: string;
  event_images: EventImage[];
}) => {
  const imagePublicUrls = await fetchImagePublicUrls(event_images);

  return (
    <>
      <div className="border rounded-md shadow-md p-6 w-fit">
        <div>
          <h3 className="font-mono text-primary text-lg">Event images</h3>
          <Separator />
          <p className="text-sm text-muted-foreground italic">
            Add up to 3 images to your event.
          </p>
          <div className="py-4">
            {imagePublicUrls.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {imagePublicUrls.map((img, i) => (
                  <div key={i} className="relative w-full aspect-square">
                    <Image
                      src={img.publicUrl}
                      alt={`event-img-${i + 1}`}
                      className="object-cover rounded-md border"
                      fill
                    />
                    <div className="absolute bottom-0 z-10 -right-3">
                      <DeleteLogoButton
                        eventId={eventId}
                        event_logo_url={img.filePath}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
            serverAction={uploadImage}
            eventId={eventId}
            formLabel="Upload image"
            formInstruction="Add an image to your event"
            toastDescription="A new image was added to your event!"
            name="event_image"
          />
        </div>
      </div>
    </>
  );
};

export default AddEventImage;
