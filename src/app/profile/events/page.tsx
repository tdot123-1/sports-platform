import EventsList from "@/components/events/events-list";
import PaginationWrapper from "@/components/events/pagination-wrapper";
import EventsListSkeleton from "@/components/skeletons/events-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <h1>My Events</h1>
      <Suspense fallback={<EventsListSkeleton />}>
        <EventsList userId={data.user.id} currentPage={currentPage} />
      </Suspense>
      <div className="w-fit mx-auto py-6">
        <Suspense fallback={<Skeleton className="h-6 w-28" />}>
          <PaginationWrapper query={query} userId={data.user.id} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
