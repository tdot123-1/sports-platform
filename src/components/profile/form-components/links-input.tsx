"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CircleXIcon } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";

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
  const [addedLinks, setAddedLinks] = useState<string[]>(
    event_links ? event_links : []
  );
  const [linkInput, setLinkInput] = useState("");

  // compute linksStr dynamically
  const linksStr = useMemo(() => addedLinks.join(","), [addedLinks]);

  const handleSubmit = () => {
    if (!addedLinks.includes(linkInput) && addedLinks.length < 5) {
      setAddedLinks((prev) => [...prev, linkInput]);
    }
    setLinkInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLinkInput(value.trim());
  };

  // allow enter key for submitting link
  const handleKeyDown = (e: any) => {
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
      <Label htmlFor={name}>Links</Label>
      <p className="text-xs italic">
        Optionally, provide some links to further inform about your event
        (social media, event website, etc.).
      </p>
      <div className="flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors mb-2">
        <ScrollArea className="w-full">
          <ul aria-describedby={describedBy}>
            {addedLinks.length ? (
              addedLinks.map((link, i) => (
                <li
                  key={`${link}-${i}`}
                  className="flex items-center gap-1 mb-1"
                >
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

                  <span className="underline overflow-hidden">{link}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground italic">
                None added
              </li>
            )}
          </ul>
          <ScrollBar orientation={`horizontal`} />
        </ScrollArea>
      </div>

      <div className="flex gap-1">
        <Label hidden className="hidden" htmlFor="add_links">
          Add links
        </Label>
        <Input
          onKeyDown={handleKeyDown}
          value={linkInput}
          onChange={handleInputChange}
          id="add_links"
          name="add_links"
          disabled={pending }
        />
        <Button disabled={pending} onClick={handleSubmit} type="button">
          Add link
        </Button>
      </div>
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
