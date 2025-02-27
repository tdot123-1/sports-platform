import { HeartHandshakeIcon } from "lucide-react";

const Page = () => {
  return (
    <section className="px-4">
      <h1 className="text-2xl font-mono text-primary mt-4">Support</h1>
      <p className="text-sm my-6">
        [explain how to support the platform] Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Temporibus molestiae aliquam nisi tempore
        repellat natus exercitationem debitis necessitatibus mollitia recusandae
        impedit.
      </p>
      <div className="flex gap-1 my-4">
        <HeartHandshakeIcon />
        <span className="font-semibold underline underline-offset-2">
          link-to-support
        </span>
      </div>
    </section>
  );
};

export default Page;
