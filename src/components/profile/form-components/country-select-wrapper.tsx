import countries from "i18n-iso-countries";
import CountrySelect from "./country-select";

interface CountrySelectWrapperProps {
  event_country?: string;
  pending: boolean;
  name: string;
  describedBy: string;
}

const CountrySelectWrapper = ({
  event_country,
  pending,
  name,
  describedBy,
}: CountrySelectWrapperProps) => {
  const countryList = Object.entries(countries.getNames("en")).map(
    ([code, name]) => ({ code, name })
  );
  return (
    <>
      <CountrySelect
        describedBy={describedBy}
        name={name}
        countryList={countryList}
        pending={pending}
      />
    </>
  );
};

export default CountrySelectWrapper;
