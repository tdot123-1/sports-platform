"use client";

import { IMG_MAX_SIZE } from "@/lib/constants";
import { ChangeEvent, FormEvent, useState } from "react";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { UploadIcon } from "lucide-react";
import { uploadCompressedImage } from "@/lib/actions/storage/compress-upload/actions";
import { Button } from "@/components/ui/button";

interface UploadCompressMediaProps {
  eventId: string;
  formLabel: string;
  formInstruction: string;
  toastSuccess: string;
  name: string;
  previousImgUrl?: string | null;
}

const UploadCompressMedia = ({
  eventId,
  formLabel,
  formInstruction,
  toastSuccess,
  name,
  previousImgUrl,
}: UploadCompressMediaProps) => {
  const [compressedFile, setCompressedFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // compress file to 1mb
  const handleFileCompression = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    let fileToUpload = file;

    if (file.size > IMG_MAX_SIZE) {
      console.log("Compressing file...");
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      try {
        const fileAfterCompression = await imageCompression(file, options);
        console.log("File compression complete");
        fileToUpload = fileAfterCompression;
      } catch (error) {
        console.error("Compression error: ", error);
        toast.error("Error compressing file");
        return;
      }
    }

    setCompressedFile(fileToUpload);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!compressedFile) {
      toast.error("No file selected");
      return;
    }

    setIsLoading(true);
    try {
      const result = await uploadCompressedImage(compressedFile, eventId);

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
