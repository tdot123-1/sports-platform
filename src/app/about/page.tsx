import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const Page = () => {
  return (
    <>
      <section className="px-4">
        <article className="my-12">
          <h2 className="text-2xl font-mono text-primary w-fit mx-auto">
            About the platform
          </h2>
          <p className="bg-textbox/75 p-1 rounded-md text-center md:w-1/2 mx-auto my-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
            voluptatibus tempore voluptates consequuntur aperiam possimus
            aliquam labore voluptas voluptate, similique neque nihil nam,
            repellendus fugiat nisi doloremque mollitia quam quisquam.
          </p>
        </article>
        <article className="my-12">
          <h2 className="text-2xl font-mono text-primary">Who is it for</h2>
          <p className="bg-textbox/75 p-1 rounded-md md:w-1/2 lg:w-2/5 py-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
            minus, nihil fuga, praesentium sunt eveniet magni ipsum dolorum vero
            iusto impedit assumenda. Cupiditate veritatis quo qui nemo quod non
            voluptas?
          </p>
        </article>
        <article className="my-12 text-right">
          <h2 className="text-2xl font-mono text-primary">How to use it</h2>
          <p className="bg-textbox/75 p-1 rounded-md ml-auto md:w-1/2 lg:w-2/5 py-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
            minus, nihil fuga, praesentium sunt eveniet magni ipsum dolorum vero
            iusto impedit assumenda. Cupiditate veritatis quo qui nemo quod non
            voluptas?
          </p>
        </article>
      </section>
    </>
  );
};

export default Page;
