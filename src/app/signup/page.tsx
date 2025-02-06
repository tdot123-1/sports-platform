import SignupForm from "@/components/auth/signup-form";

const Page = () => {
  return (
    <>
      <section className="px-4">
        <h1>Signup</h1>
        <div className="flex justify-center mt-28">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <SignupForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
