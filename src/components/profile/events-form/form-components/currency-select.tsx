"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Currency } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface CurrencySelectProps {
  currencyList: Currency[];
  pending: boolean;
  cost_currency?: string;
  name: string;
  describedBy: string;
}

const CurrencySelect = ({
  currencyList,
  pending,
  cost_currency,
  name,
  describedBy,
}: CurrencySelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    cost_currency ? cost_currency : "EUR"
  );

  // find selected currency code in list
  const selectedCurrencyInfo = selectedCurrency
    ? currencyList.find((c) => c.code === selectedCurrency)
    : null;

  // format display: "Currency Name (Code)"
  const displayValue = selectedCurrencyInfo
    ? `${selectedCurrencyInfo.currency} (${selectedCurrencyInfo.code})`
    : "Select currency...";

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit justify-between"
            disabled={pending}
            aria-describedby={describedBy}
            value={selectedCurrency}
            id={name}
          >
            {/* {selectedCurrency
              ? currencyList.find((c) => c.code === selectedCurrency)?.currency
              : "Select currency..."} */}
            {displayValue}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-10/12  p-0">
          <Command>
            <CommandInput
              disabled={pending}
              placeholder="Search currency..."
              className="h-9"
            />

            <CommandList>
              <CommandEmpty>Currency not found.</CommandEmpty>
              <CommandGroup>
                {currencyList?.map((c) => (
                  <CommandItem
                    key={c.code}
                    value={c.currency}
                    onSelect={() => {
                      setSelectedCurrency(
                        c.code === selectedCurrency ? "" : c.code
                      );
                      setOpen(false);
                    }}
                  >
                    {`${c.currency} (${c.code})`}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedCurrency === c.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        name={name}
        type="hidden"
        value={selectedCurrency}
        readOnly
        hidden
        className="hidden"
        required
      />
    </>
  );
};

export default CurrencySelect;
