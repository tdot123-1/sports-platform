import { fetchEventsPages } from "@/lib/data/events/data";
import AppPagination from "./pagination";
import { FilterOptions } from "@/lib/types";

const PaginationWrapper = async ({
  query,
  userId,
  filter,
  priceFilter,
  passedEventsFilter,
}: {
  query: string;
  userId?: string;
  filter?: FilterOptions;
  priceFilter?: number;
  passedEventsFilter?: boolean;
}) => {
  // fetch total pages
  const totalPages = await fetchEventsPages(
    userId,
    query,
    filter,
    priceFilter,
    passedEventsFilter
  );

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
