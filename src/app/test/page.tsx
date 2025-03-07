import CityAutocomplete from "@/components/places-autocomplete/city-autocomplete";

const Page = () => {
  return (
    <>
      <div className="my-28 mx-10">
        <CityAutocomplete countryCode="nl" />
      </div>
    </>
  );
};

export default Page;
