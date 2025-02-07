"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CircleXIcon } from "lucide-react";
import {

  ChangeEvent,

  useState,
} from "react";

const LinksInput = () => {
  const [addedLinks, setAddedLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");

  const handleSubmit = () => {
    if (!addedLinks.includes(linkInput)) {
      setAddedLinks((prev) => [...prev, linkInput]);
    }
    setLinkInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLinkInput(value.trim());
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
        e.preventDefault()
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
      <Label htmlFor="event_links">Links</Label>
      <p className="text-xs italic">
        Optionally, provide some links to further inform about your event (social media, event website, etc.).
      </p>
      <div className="flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors mb-2">
        <ScrollArea className="w-full">
          <ul>
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
        <Input
          onKeyDown={handleKeyDown}
          value={linkInput}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </div>
    </>
  );
};

export default LinksInput;
