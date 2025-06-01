import {
  infoCollectionList,
  infoCookiesList,
  infoRightsList,
  infoSharingList,
} from "@/components/privacy/accordion-items";
import PrivacyAccordion from "@/components/privacy/privacy-accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

const Page = () => {
  return (
    <section className="px-4 py-8">
      <div className="mx-0 md:mx-8">
        <h1 className="text-3xl font-mono text-primary mt-4 text-center md:text-left">
          Privacy
        </h1>
        <p className="my-6 w-full md:w-2/3 lg:w-1/3">
          Welcome to HI-FIVES! Your privacy matters to us. This privacy policy
          explains how we collect, use and protect your information when you use
          our website [link] and services.
        </p>
      </div>
      <div className="mx-auto w-full md:w-2/3 lg:w-1/3 mt-10">
        <article className="my-6">
          <h2 className="text-xl font-mono text-primary">
            Information collection
          </h2>
          <div className="w-full">
            <PrivacyAccordion items={infoCollectionList} />
          </div>
        </article>
        <article className="my-6">
          <h2 className="text-xl font-mono text-primary">Cookies</h2>
          <div className="w-full">
            <PrivacyAccordion items={infoCookiesList} />
          </div>
        </article>
        <article className="my-6">
          <h2 className="text-xl font-mono text-primary">Data sharing</h2>
          <div className="w-full">
            <PrivacyAccordion items={infoSharingList} />
          </div>
        </article>
        <article className="my-6">
          <h2 className="text-xl font-mono text-primary">User rights</h2>
          <div className="w-full">
            <PrivacyAccordion items={infoRightsList} />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Page;
