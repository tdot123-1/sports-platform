import DateRangePicker from "@/components/profile/events-form/form-components/date-range-picker";

const Page = () => {
  return (
    <>
      <h1>Calendar view</h1>
      <DateRangePicker name="range" pending={false} describedBy="range-error" />
    </>
  );
};

export default Page;
