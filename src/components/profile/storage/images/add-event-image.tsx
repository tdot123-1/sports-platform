import { deleteImageFromStorage } from "@/lib/actions/storage/actions";

import { Separator } from "@/components/ui/separator";
import { EventImage } from "@/lib/types";
import { fetchImagePublicUrls } from "@/lib/data/storage/data";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
import DeleteMediaButton from "../delete-media";
import UploadCompressMedia from "../upload-compress-media";

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
      <div className="bg-white border rounded-md shadow-md p-6 w-full h-full max-w-screen-lg">
        <div>
          <h3 className="font-mono text-basket text-2xl">Event images</h3>
          <Separator />
          <p className="text-sm text-muted-foreground">
            Add up to 3 images to your event.
          </p>
          <div className="py-8">
            {imagePublicUrls.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {imagePublicUrls.map((img, i) => (
                    <div
                      key={`src-${i}`}
                      className="relative w-full aspect-square"
                    >
                      <Image
                        src={img.publicUrl}
                        alt={`event-img-${i + 1}`}
                        className="object-cover rounded-md border"
                        fill
                      />
                      <div className="absolute -bottom-5 z-10 -right-3">
                        <DeleteMediaButton
                          eventId={eventId}
                          filePath={img.filePath}
                          serverAction={deleteImageFromStorage}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  {imagePublicUrls.map((img, i) => (
                    <a
                      key={`href-${i}`}
                      className="flex underline underline-offset-2 text-sm text-muted-foreground mb-1"
                      href={img.publicUrl}
                      target="_blank"
                    >
                      <span>Click here to view full image {i + 1}</span>
                      <ExternalLinkIcon size={14} />
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-xs text-muted-foreground mt-3">
                No images uploaded yet.
              </p>
            )}
          </div>
        </div>
        <div className="pt-6">
          {/** Allowed files: *.jpg, *.jpeg, *.svg, no larger than 2MB */}
          
          <UploadCompressMedia
            eventId={eventId}
            formLabel="Upload image"
            formInstruction="Add an image to your event"
            toastSuccess="A new image was added to your event!"
            name="event_image"
          />
        </div>
      </div>
    </>
  );
};

export default AddEventImage;
