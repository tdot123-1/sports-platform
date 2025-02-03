import { fetchEventsPages } from "@/lib/data/events/data";
import AppPagination from "./pagination";

const PaginationWrapper = async ({
  query,
  userId,
}: {
  query: string;
  userId?: string;
}) => {
  // fetch total pages
  const totalPages = await fetchEventsPages(userId, query);

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
