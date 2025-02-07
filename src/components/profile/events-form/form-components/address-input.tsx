import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { State } from "@/lib/actions/events/actions";

// temporary solution for address format
const addressComponents = [
  {
    label: "Address Line 1",
    name: "address_one",
    instruction: "Street name",
    required: true,
  },
  {
    label: "Address Line 2",
    name: "address_two",
    instruction: "Apartment, suite, unit etc. (optional)",
    required: false,
  },
  {
    label: "City",
    name: "city",
    instruction: "",
    required: true,
  },
  {
    label: "Region / Province / State",
    name: "region",
    instruction: "",
    required: true,
  },
  {
    label: "Postal Code / ZIP",
    name: "postal",
    instruction: "",
    required: true,
  },
];

interface AddressInputProps {
  state: State;
  pending: boolean;
}

const AddressInput = ({ state, pending }: AddressInputProps) => {
  return (
    <>
      <div className="mt-2">
        {addressComponents.map((x) => (
          <div key={x.name}>
            <div className="flex flex-col justify-between items-baseline lg:flex-row mb-2 gap-1">
              <Label className="text-muted-foreground" htmlFor={x.name}>
                {x.label}:
              </Label>
              <div className="w-full lg:w-1/2">
                <Input
                  id={x.name}
                  name={x.name}
                  disabled={pending}
                  type="text"
                />
                {x.instruction && (
                  <p className="text-xs italic">{x.instruction}</p>
                )}
              </div>
            </div>
            {/* <div id={`${x.name}-error`} aria-live="polite" aria-atomic="true">
              {state.errors?.event_address?.[`${x.name}`] && (
                <p className="text-sm mt-2 text-destructive italic">
                  {state.errors.event_address[`${x.name}`]}
                </p>
              )}
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default AddressInput;
