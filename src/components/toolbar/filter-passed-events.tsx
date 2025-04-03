"use client";

import { useDebouncedCallback } from "use-debounce";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";
import { ReadonlyURLSearchParams } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";

interface FilterPassedEventsProps {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  replace: (href: string, options?: NavigateOptions) => void;
  passedEventsFilter?: boolean;
  batch?: boolean;
}

const FilterPassedEvents = ({
  pathname,
  searchParams,
  replace,
  passedEventsFilter,
  batch,
}: FilterPassedEventsProps) => {
  const [showPassedEvents] = useState(
    passedEventsFilter ? passedEventsFilter : false
  );

  const handlePassedEvents = useDebouncedCallback((newValue: boolean) => {
    const params = new URLSearchParams(searchParams);

    if (batch) {
      params.set("batch", "1");
    } else {
      params.set("page", "1");
    }

    if (newValue) {
      params.set("pe", "true");
    } else {
      params.delete("pe");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <DropdownMenuItem className="text-xs" onClick={(e) => e.preventDefault()}>
        <Switch
          onCheckedChange={handlePassedEvents}
          defaultChecked={showPassedEvents}
        />
        Show passed events
      </DropdownMenuItem>
    </>
  );
};

export default FilterPassedEvents;
