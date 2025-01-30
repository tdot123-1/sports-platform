import CreateEvent from "@/components/profile/create-event";

const Page = () => {
  return (
    <>
      <h1>Create Event</h1>
      <div className="flex justify-center pb-6">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h2 className="mb-4 text-center">New Event</h2>
          <CreateEvent />
        </div>
      </div>
    </>
  );
};

export default Page;
