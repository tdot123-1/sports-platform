import LoginForm from "@/components/auth/login-form";

const Page = () => {
  return (
    <>
      <h1>Login</h1>
      <div className="flex justify-center mt-28">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Page;
