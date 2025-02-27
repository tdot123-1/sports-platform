import {
  infoCollectionList,
  infoCookiesList,
  infoRightsList,
  infoSharingList,
} from "@/components/privacy/accordion-items";
import PrivacyAccordion from "@/components/privacy/privacy-accordion";

const Page = () => {
  return (
    <section className="px-4 mb-12">
      <h1 className="text-2xl font-mono text-primary mt-4">Privacy</h1>
      <p className="text-sm my-6">
        [introduce purpose of page] Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Temporibus molestiae aliquam nisi tempore repellat
        natus exercitationem debitis necessitatibus mollitia recusandae impedit.
      </p>
      <article className="my-6">
        <h2 className="text-xl font-mono text-primary">
          Information collection
        </h2>
        <div className="w-full sm:w-3/5 md:w-1/2 lg:w-2/5">
          <PrivacyAccordion items={infoCollectionList} />
        </div>
      </article>
      <article className="my-6">
        <h2 className="text-xl font-mono text-primary">Cookies</h2>
        <div className="w-full sm:w-3/5 md:w-1/2 lg:w-2/5">
          <PrivacyAccordion items={infoCookiesList} />
        </div>
      </article>
      <article className="my-6">
        <h2 className="text-xl font-mono text-primary">Data sharing</h2>
        <div className="w-full sm:w-3/5 md:w-1/2 lg:w-2/5">
          <PrivacyAccordion items={infoSharingList} />
        </div>
      </article>
      <article className="my-6">
        <h2 className="text-xl font-mono text-primary">User rights</h2>
        <div className="w-full sm:w-3/5 md:w-1/2 lg:w-2/5">
          <PrivacyAccordion items={infoRightsList} />
        </div>
      </article>
    </section>
  );
};

export default Page;
