import LocationInput from "@/components/places-autocomplete/location-input";
import { State } from "@/lib/actions/events/actions";
import { countryList } from "@/lib/countries";

const Page = () => {
  const initialState: State = { message: "", errors: {}, success: false };

  return (
    <>
      <div className="my-28 mx-4">
        <LocationInput
          state={initialState}
          pending={false}
          countryList={countryList}
        />
      </div>
    </>
  );
};

export default Page;
