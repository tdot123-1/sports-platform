"use client";

import { IMG_MAX_SIZE } from "@/lib/constants";
import { ChangeEvent, FormEvent, useState } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { UploadIcon } from "lucide-react";
import {
  uploadCompressedImage,
  uploadCompressedLogo,
} from "@/lib/actions/storage/compress-upload/actions";
import { Button } from "@/components/ui/button";

interface UploadCompressMediaProps {
  eventId: string;
  formLabel: string;
  formInstruction: string;
  toastSuccess: string;
  name: string;
  previousImgUrl?: string | null;
  logoUpload?: boolean;
}

const UploadCompressMedia = ({
  eventId,
  formLabel,
  formInstruction,
  toastSuccess,
  name,
  previousImgUrl,
  logoUpload,
}: UploadCompressMediaProps) => {

  // store compressed file in state for upload
  const [compressedFile, setCompressedFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // compress file to 1mb
  // call whenever selected file changes
  const handleFileCompression = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    // get selected file
    const file = event.target.files?.[0];

    if (!file) return;

    // initially point to selected file
    let fileToUpload = file;

    // only compress if file is larger than 1mb
    if (file.size > IMG_MAX_SIZE) {
      console.log("Compressing file...");

      // compression options
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      try {

        // compress file
        const fileAfterCompression = await imageCompression(file, options);

        console.log("File compression complete");

        // point to compressed file
        fileToUpload = fileAfterCompression;
      } catch (error) {

        // notify in case there was an error, don't update state var
        console.error("Compression error: ", error);
        toast.error("Error compressing file");
        return;
      }
    }

    // set file in state var
    setCompressedFile(fileToUpload);
  };

  // form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    // prevent default, clear error msg
    e.preventDefault();
    setError("");

    // error message if no file is set
    if (!compressedFile) {
      toast.error("No file selected");
      return;
    }

    // loading state
    setIsLoading(true);
    try {

      // call function to either upload image or logo
      let result;
      if (logoUpload) {
        result = await uploadCompressedLogo(
          compressedFile,
          eventId,
          previousImgUrl
        );
      } else {
        result = await uploadCompressedImage(compressedFile, eventId);
      }

      // display correct message based on upload result
      if (!result.success) {
        toast.error(result.message);
        setError(result.message);
      } else {
        toast.success(toastSuccess);
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      setError("An unexpected error occurred");
    }
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor={name}>{formLabel}</Label>
          <p className="text-muted-foreground text-sm">{formInstruction}</p>
          <Input
            onChange={handleFileCompression}
            disabled={isLoading}
            id={name}
            name={name}
            type={`file`}
            accept="image/jpeg, image/png, image/webp, image/svg+xml"
            required
          />
          {previousImgUrl && (
            <Input
              type={`hidden`}
              readOnly
              hidden
              className="hidden"
              value={previousImgUrl}
              id="previous_url"
              name="previous_url"
            />
          )}

          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>

        <Button disabled={isLoading} type={`submit`}>
          <div className="flex justify-start items-start gap-1">
            <UploadIcon />
            <span className="hidden md:block">Upload</span>
          </div>
        </Button>
      </form>
    </>
  );
};

export default UploadCompressMedia;
