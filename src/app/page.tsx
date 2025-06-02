import NewEventsCarouselWrapper from "@/components/events/new-events/events-carousel-wrapper";
import EventsSection from "@/components/home/events-section";
import HeroSection from "@/components/home/hero-section";
import HeroSectionMobile from "@/components/home/hero-section-mobile";
import ProfileSection from "@/components/home/profile-section";
import ConfirmEmailChangeToast from "@/components/profile/settings/confirm-email-change-toast";
import ProfileDeletedToast from "@/components/profile/settings/profile-deleted-toast";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import { redirect } from "next/navigation";

import { Suspense } from "react";

export default async function Home(props: {
  searchParams?: Promise<{
    profile_deleted?: string;
    message?: string;
    code?: string;
    source?: string;
  }>;
}) {
  // use searchparams to find out if there was a redirect after profile delete
  const searchParams = await props.searchParams;
  const profile_deleted = searchParams?.profile_deleted;

  // if email was changed
  const message = searchParams?.message;

  // if password reset was requested
  const code = searchParams?.code;
  const source = searchParams?.source;

  if (code && source === "recovery") {
    redirect(`/auth/reset-password?code=${code.toString()}`);
  }

  return (
    <>
      {/** show toast if profile was deleted */}
      {profile_deleted === "true" && <ProfileDeletedToast />}

      {/** show toast if user was redirected after confirming email change  */}
      {message?.includes("Confirmation link accepted.") && (
        <>
          <ConfirmEmailChangeToast />
          {/** have div as well in case toast does not trigger */}
          <div className="w-fit left-1/2 transform -translate-x-1/2 my-4 p-4 rounded-md bg-info text-center fixed top-10 z-50">
            <h2 className="font-semibold text-lg">
              New email address confirmed
            </h2>
            <p>Click the link in your other email to finish the transfer</p>
          </div>
        </>
      )}

      {/** page */}

      <div className="hidden md:block">
        <HeroSection />
      </div>
      <div className="block md:hidden">
        <HeroSectionMobile />
      </div>

      <section className="py-16 bg-muted">
        <h2 className="text-3xl font-mono font-semibold text-primary px-4 text-center mb-8">
          What&apos;s New
        </h2>
        <div className="flex justify-center w-full mx-auto sm:w-10/12 md:w-9/12">
          <Suspense fallback={<CarouselSkeleton />}>
            <NewEventsCarouselWrapper />
          </Suspense>
        </div>
      </section>

      <EventsSection />

      <ProfileSection />
    </>
  );
}
