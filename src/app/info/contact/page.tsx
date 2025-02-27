import { MailIcon, MessageCircleIcon } from "lucide-react";

const Page = () => {
  return (
    <section className="px-4">
      <h1 className="text-2xl font-mono text-primary mt-4">Contact</h1>
      <p className="text-sm my-6">
        [explain what we can be contacted for] Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Temporibus molestiae aliquam nisi tempore
        repellat natus exercitationem debitis necessitatibus mollitia recusandae
        impedit.
      </p>
      <div className="flex gap-1 my-4">
        <MailIcon />
        <span className="font-semibold">sports_platform@email.com</span>
      </div>
      <div className="flex gap-1">
        <MessageCircleIcon />
        <span className="font-semibold">+12 3 45 67 89</span>
      </div>
    </section>
  );
};

export default Page;
