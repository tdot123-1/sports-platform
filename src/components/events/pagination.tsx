"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { generatePagination, generatePaginationMobile } from "@/lib/utils";

const AppPagination = ({
  totalPages,
  isMobile,
}: {
  totalPages: number;
  isMobile: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = isMobile
    ? generatePaginationMobile(currentPage, totalPages)
    : generatePagination(currentPage, totalPages);

  return (
    <>
      <Pagination className="pb-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={
                currentPage > 1
                  ? createPageURL(currentPage - 1)
                  : createPageURL(1)
              }
            />
          </PaginationItem>
          {allPages.map((page, i) => (
            <PaginationItem key={`${page}-${i}`}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href={
                currentPage < totalPages
                  ? createPageURL(currentPage + 1)
                  : createPageURL(totalPages)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default AppPagination;
