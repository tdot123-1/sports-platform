import AgeSelect from "@/components/profile/form-components/age-select";
import CountrySelectWrapper from "@/components/profile/form-components/country-select-wrapper";
import MultiSelect from "@/components/profile/form-components/multiselect";
import { TargetAgeGroupMap, TargetLevelMap } from "@/lib/types";

export default function Home() {
  return (
    <>
      <section className="px-4">
        <h1>Sports platform</h1>
        <p>What's new</p>
        <CountrySelectWrapper pending={false} name="name" describedBy="error" />
      </section>
    </>
  );
}
