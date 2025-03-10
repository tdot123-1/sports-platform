import CityAutocomplete from "@/components/places-autocomplete/city-autocomplete";

const Page = () => {
  return (
    <>
      <div className="my-28 mx-10">
        <CityAutocomplete
          countryCode="nl"
          name="address_city"
          pending={false}
          describedBy="address_city-error"
        />
      </div>
    </>
  );
};

export default Page;
