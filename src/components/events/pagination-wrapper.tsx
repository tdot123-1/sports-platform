import { fetchEventsPages } from "@/lib/data/events/data";
import AppPagination from "./pagination";
import { FilterOptions } from "@/lib/types";

const PaginationWrapper = async ({
  query,
  userId,
  filter,
}: {
  query: string;
  userId?: string;
  filter?: FilterOptions;
}) => {
  // fetch total pages
  const totalPages = await fetchEventsPages(userId, query, filter);

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
