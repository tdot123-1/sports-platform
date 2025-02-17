"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyCodes } from "@/lib/types";
import { convertCurrencyValueToString } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import CurrencySelect from "./currency-select";
import { currencyList } from "@/lib/countries";

interface CostEstimateProps {
  name: string;
  cost_estimate?: number;
  cost_currency?: string;
  pending: boolean;
  describedBy: string;
}

const CostEstimate = ({
  name,
  cost_estimate,
  cost_currency,
  pending,
  describedBy,
}: CostEstimateProps) => {
  // set initial input
  const [costInput, setCostInput] = useState<string | undefined>(
    cost_estimate !== undefined
      ? convertCurrencyValueToString(cost_estimate)
      : ""
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // allow only numbers, 1 comma or period
    if (/^[0-9]*[.,]?[0-9]*$/.test(value)) {
      // replace comma with a period
      value = value.replace(",", ".");

      setCostInput(value.trim());
    }
  };

  // format to correct input on blur
  const handleFormatInput = () => {
    // trim spaces
    if (costInput !== undefined) {
      let formatted = costInput.trim();

      // if input is empty or ".", return "0.00"
      if (formatted === "" || formatted === ".") {
        setCostInput("0.00");
        return;
      }

      // if input starts with ".", add "0" in front
      if (formatted.startsWith(".")) {
        formatted = "0" + formatted;
      }

      // split into whole number and decimal part
      let [integerPart, decimalPart = ""] = formatted.split(".");

      // convert integer part to number to remove leading 0's, then back to string
      integerPart = String(Number(integerPart) || 0);

      // limit decimal to 2 digits
      decimalPart = decimalPart.slice(0, 2);

      // if decimal is empty, add "00"
      if (decimalPart.length === 0) {
        decimalPart = "00";
      } else if (decimalPart.length === 1) {
        // if only one digit, add a trailing "0"
        decimalPart += "0";
      }

      // set input
      setCostInput(`${integerPart}.${decimalPart}`);
    }
  };

  // format price in cents on server action

  return (
    <>
      <div className="flex gap-1">
        <Label hidden className="hidden" htmlFor="cost_currency">
          Select currency
        </Label>
        {/* <Select
          name="cost_currency"
          defaultValue={cost_currency ? cost_currency : "EUR"}
          disabled={pending}
        >
          <SelectTrigger id={"cost_currency"} className="w-fit">
            <SelectValue aria-describedby="cost_currency-error" />
          </SelectTrigger>
          <SelectContent>
            {CurrencyCodes.map((code) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
        <CurrencySelect
          currencyList={currencyList}
          cost_currency={cost_currency}
          name="cost_currency"
          pending={pending}
          describedBy="cost_currency-error"
        />
        <Input
          id={name}
          name={name}
          type="text"
          value={costInput}
          onChange={handleInputChange}
          onBlur={handleFormatInput}
          disabled={pending}
          maxLength={10}
          aria-describedby={describedBy}
          required
        />
      </div>
    </>
  );
};

export default CostEstimate;
