import { uploadImage } from "@/lib/actions/storage/actions";
import UploadMediaForm from "../upload-media";

const AddEventImage = ({ eventId }: { eventId: string }) => {
  return (
    <>
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
    </>
  );
};

export default AddEventImage;
