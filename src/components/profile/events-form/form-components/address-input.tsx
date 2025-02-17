import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { State } from "@/lib/actions/events/actions";
import { SportsEvent } from "@/lib/types";

// temporary solution for address format
const addressComponents = [
  {
    label: "Address Line 1",
    name: "address_line_one",
    instruction: "Street name",
    required: true,
    describedby: "address_line_one-error",
  },
  {
    label: "Address Line 2",
    name: "address_line_two",
    instruction: "Building number, suite, unit, floor etc. (optional)",
    required: false,
    describedby: "address_line_two-error",
  },
  {
    label: "City",
    name: "address_city",
    instruction: "",
    required: true,
    describedby: "address_city-error",
  },
  {
    label: "Region / Province / State",
    name: "address_region",
    instruction: "",
    required: false,
    describedby: "address_region-error",
  },
  {
    label: "Postal Code / ZIP",
    name: "address_postal_code",
    instruction: "",
    required: false,
    describedby: "address_postal_code-error",
  },
];

interface AddressInputProps {
  state: State;
  pending: boolean;
  address_line_one?: string;
  address_line_two?: string;
  address_region?: string;
  address_postal_code?: string;
  address_city?: string;
}

const AddressInput = ({
  state,
  pending,
  address_line_one,
  address_line_two,
  address_region,
  address_postal_code,
  address_city,
}: AddressInputProps) => {
  const defaultValues: Record<string, string | undefined> = {
    address_line_one,
    address_line_two,
    address_region,
    address_postal_code,
    address_city,
  };
  return (
    <>
      <div className="mt-2">
        {addressComponents.map((x) => (
          <div key={x.name}>
            <div className="flex flex-col justify-between items-baseline lg:flex-row mb-2 gap-1">
              <Label className="text-muted-foreground" htmlFor={x.name}>
                {x.label}
                {x.required && <span className="text-destructive">*</span>}:
              </Label>
              <div className="w-full lg:w-1/2">
                <Input
                  id={x.name}
                  name={x.name}
                  disabled={pending}
                  type="text"
                  aria-describedby={x.describedby}
                  defaultValue={defaultValues[x.name] ?? ""}
                  required={x.required}
                  maxLength={254}
                />
                {x.instruction && (
                  <p className="text-xs italic">{x.instruction}</p>
                )}
              </div>
            </div>
            <div id={x.describedby} aria-live="polite" aria-atomic="true">
              {(state.errors as Record<string, string[]>)?.[x.name]?.map(
                (error) => (
                  <p
                    className="text-sm my-1 text-right text-destructive italic"
                    key={error}
                  >
                    {error}
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddressInput;
