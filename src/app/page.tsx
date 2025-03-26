import NewEventsCarouselWrapper from "@/components/events/new-events/events-carousel-wrapper";
import ConfirmEmailChangeToast from "@/components/profile/settings/confirm-email-change-toast";
import ProfileDeletedToast from "@/components/profile/settings/profile-deleted-toast";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";

import { Suspense } from "react";

export default async function Home(props: {
  searchParams?: Promise<{
    profile_deleted?: string;
    message?: string;
  }>;
}) {
  // use searchparams to find out if there was a redirect after profile delete
  const searchParams = await props.searchParams;
  const profile_deleted = searchParams?.profile_deleted;
  const message = searchParams?.message;

  return (
    <>
      {/** show toast if profile was deleted */}
      {profile_deleted === "true" && <ProfileDeletedToast />}

      {/** show toast if user was redirected after confirming email change  */}
      {message?.includes("Confirmation link accepted.") && (
        <>
          <ConfirmEmailChangeToast />
          {/** have div as well in case toast does not trigger */}
          <div className="w-fit mx-auto m-4 p-4 rounded-md bg-info text-center">
            <h2 className="font-semibold">New email address confirmed</h2>
            <p>Click the link in your other email to finish the transfer</p>
          </div>
        </>
      )}

      {/** page */}

      <section className="my-12 px-4">
        <h1 className="text-2xl font-mono text-primary w-fit mx-auto">
          Sports platform
        </h1>
        <p className="text-center md:w-1/2 mx-auto my-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          voluptatibus tempore voluptates consequuntur aperiam possimus aliquam
          labore voluptas voluptate, similique neque nihil nam, repellendus
          fugiat nisi doloremque mollitia quam quisquam.
        </p>
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-mono text-primary px-4">
          What&apos;s New
        </h2>
        <div className="flex-1 min-w-0 flex justify-center">
          <Suspense fallback={<CarouselSkeleton />}>
            <NewEventsCarouselWrapper />
          </Suspense>
        </div>
      </section>
      <section className="my-12 px-4">
        <h2 className="text-2xl font-mono text-primary">Some other info</h2>
        <p className=" md:w-1/2 lg:w-1/3 py-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam minus,
          nihil fuga, praesentium sunt eveniet magni ipsum dolorum vero iusto
          impedit assumenda. Cupiditate veritatis quo qui nemo quod non
          voluptas?
        </p>
      </section>
      <section className="my-12 px-4 text-right">
        <h2 className="text-2xl font-mono text-primary">Some other info</h2>
        <p className="ml-auto md:w-1/2 lg:w-1/3 py-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam minus,
          nihil fuga, praesentium sunt eveniet magni ipsum dolorum vero iusto
          impedit assumenda. Cupiditate veritatis quo qui nemo quod non
          voluptas?
        </p>
      </section>
    </>
  );
}
