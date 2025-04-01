"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidSocialLink } from "@/lib/url-validation";
import { CircleXIcon } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react";

interface LinksInputProps {
  event_links?: string[];
  name: string;
  describedBy: string;
  pending: boolean;
}

const LinksInput = ({
  event_links,
  name,
  describedBy,
  pending,
}: LinksInputProps) => {
  // list of added links
  const [addedLinks, setAddedLinks] = useState<string[]>(
    event_links ? event_links : []
  );

  // newly inputted links
  const [linkInput, setLinkInput] = useState("");

  const [inputError, setInputError] = useState("");

  // compute linksStr dynamically, to submit along form
  const linksStr = useMemo(() => addedLinks.join(","), [addedLinks]);

  const handleSubmit = () => {
    // check if link is unique, and list of links is within range
    setInputError("");
    const trimmedLink = linkInput.trim();
    if (!addedLinks.includes(trimmedLink) && addedLinks.length < 5) {
      if (!isValidSocialLink(trimmedLink)) {
        setInputError("Invalid social media link");
      } else {
        setAddedLinks((prev) => [...prev, trimmedLink]);
      }
    }
    setLinkInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLinkInput(value.trim());
  };

  // allow enter key for submitting link
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (linkInput.length > 0) {
        handleSubmit();
      }
    }
  };

  const removeLink = (link: string) => {
    setAddedLinks((prev) => prev.filter((v) => v !== link));
  };

  return (
    <>
      <div className="flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors mb-2">
        {/* <ScrollArea className="w-full"> */}
        <ul className="overflow-hidden text-sm" aria-describedby={describedBy}>
          {addedLinks.length ? (
            addedLinks.map((link, i) => (
              <li key={`${link}-${i}`} className="flex items-center gap-1 mb-1">
                <Button
                  variant={`outline`}
                  className="p-0"
                  onClick={() => removeLink(link)}
                  type="button"
                  disabled={pending}
                >
                  <p hidden className="hidden">
                    Remove link
                  </p>
                  <CircleXIcon className="p-0" />
                </Button>

                <span className="underline overflow-hidden text-ellipsis text-nowrap">
                  {link}
                </span>
              </li>
            ))
          ) : (
            <li className=" text-muted-foreground italic">None added</li>
          )}
        </ul>
      </div>

      <div className="flex gap-1">
        <Label hidden className="hidden" htmlFor="add_links">
          Add social links
        </Label>
        <Input
          onKeyDown={handleKeyDown}
          value={linkInput}
          onChange={handleInputChange}
          id="add_links"
          name="add_links"
          disabled={pending || addedLinks.length >= 5}
          type={`url`}
          maxLength={2048}
        />
        <Button
          className="bg-basket hover:bg-basket/60"
          disabled={pending}
          onClick={handleSubmit}
          type="button"
        >
          Add link
        </Button>
      </div>
      {inputError && (
        <p className="text-sm mt-2 text-destructive italic">{inputError}</p>
      )}
      <Input
        name={name}
        id={name}
        type="hidden"
        value={linksStr}
        readOnly
        hidden
        className="hidden"
      />
    </>
  );
};

export default LinksInput;
