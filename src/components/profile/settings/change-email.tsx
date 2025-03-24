"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MailIcon } from "lucide-react";

interface ChangeEmailProps {
  isOpenEmail: boolean;
  toggleCollapsible: (collapsible: string) => void;
}

const ChangeEmail = ({ isOpenEmail, toggleCollapsible }: ChangeEmailProps) => {
  return (
    <>
      <Collapsible
        className="flex flex-col justify-center items-center"
        open={isOpenEmail}
        onOpenChange={() => toggleCollapsible("email")}
      >
        <CollapsibleTrigger asChild>
          <Button type="button" variant={`secondary`}>
            <MailIcon /> Change email
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator className="mt-2" />
          <form>
            <div className="text-left mb-4">
              <Label>New email address</Label>
              <p className="text-xs italic">
                An email will be sent to this address to confirm the change
              </p>
              <Input type={`email`} max={254} min={3} />
            </div>
            <div className="w-fit mr-auto">
              <Button type="submit">Submit</Button>
            </div>
          </form>
          <Separator className="mt-2" />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ChangeEmail;
