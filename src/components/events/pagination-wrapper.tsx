import { fetchEventsPages } from "@/lib/data/events/data";
import AppPagination from "./pagination";

const PaginationWrapper = async ({ query }: { query: string }) => {
  // fetch total pages
  const totalPages = await fetchEventsPages(query);

  return (
    <>
      <div className="md:hidden">
        <AppPagination totalPages={totalPages} isMobile />
      </div>
      <div className="hidden md:block">
        <AppPagination totalPages={totalPages} isMobile={false} />
      </div>
    </>
  );
};

export default PaginationWrapper;
