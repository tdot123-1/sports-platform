import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const EventImage = ({ src }: { src: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Image
            src={src}
            alt="Event image"
            width={100}
            height={100}
            className="rounded-md border object-cover aspect-square"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-96 p-4 flex items-center justify-center overflow-hidden">
        <DialogTitle hidden className="hidden">
          Full size image
        </DialogTitle>
        <DialogDescription hidden className="hidden">
          Full size image
        </DialogDescription>
        <Image
          src={src}
          alt="Full-size image"
          width={600}
          height={600}
          className="rounded-md"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EventImage;
