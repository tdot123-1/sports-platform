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
import { KeyRoundIcon } from "lucide-react";

interface ChangePasswordProps {
  isOpenPassword: boolean;
  toggleCollapsible: (collapsible: string) => void;
}

const ChangePassword = ({
  isOpenPassword,
  toggleCollapsible,
}: ChangePasswordProps) => {
  return (
    <>
      <Collapsible
        className="flex flex-col justify-center items-center"
        open={isOpenPassword}
        onOpenChange={() => toggleCollapsible("password")}
      >
        <CollapsibleTrigger asChild>
          <Button type="button" variant={`secondary`}>
            <KeyRoundIcon /> Change password
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator className="mt-2" />
          <form className="text-left">
            <div className="mb-4">
              <Label>Current password</Label>
              <Input type={`password`} max={254} min={3} />
            </div>
            <div className="mb-4">
              <Label>New password</Label>
              <Input type={`password`} max={254} min={3} />
            </div>
            <div className="mb-4">
              <Label>Confirm new password</Label>
              <Input type={`password`} max={254} min={3} />
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

export default ChangePassword;
