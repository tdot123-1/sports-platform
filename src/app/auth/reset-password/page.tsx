import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <section className="px-4">
      <h1 className="text-2xl font-mono text-primary mt-4">Reset Password</h1>
      <div className="flex justify-center mt-14">
        <div className="w-full md:w-1/2 lg:w-1/3"><Input /></div>
      </div>
    </section>
  );
};

export default Page;
