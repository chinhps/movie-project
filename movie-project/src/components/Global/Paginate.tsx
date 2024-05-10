import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Paginate({
  totalPage,
  currentPage,
  wingSize = 1,
  maxPageOpen = 3,
  pageLink,
}: {
  totalPage: number;
  currentPage: number;
  wingSize?: number;
  maxPageOpen?: number;
  pageLink: string;
}) {
  const handlePaginate = () => {
    const map: Array<string | number> = Array.from(
      { length: totalPage },
      (_, index) => index + 1
    );

    const left = currentPage < maxPageOpen;
    const right = currentPage > totalPage - maxPageOpen + 1;

    if (map.length <= totalPage) {
      return map;
    }

    // check current page near left or right
    if (left || right) {
      if (left) {
        map.splice(maxPageOpen, totalPage - maxPageOpen - wingSize, "...");
      }
      if (right) {
        map.splice(wingSize, totalPage - maxPageOpen - 1, "...");
      }
      return map;
    }
    const leftSplice = map.splice(wingSize, currentPage - wingSize - 2, "...");
    map.splice(
      currentPage + 1 - leftSplice.length + 1,
      totalPage - currentPage - 1 - 1,
      "..."
    );
    return map;
  };

  const handlePageLink = (page: number | string) => {
    const url = new URL(pageLink, "http://example");
    if (url.search) {
      return `${pageLink}&page=${page}`;
    }
    return `${pageLink}?page=${page}`;
  };

  return (
    <>
      <HStack as="ul" className="navigate" mt="2rem" spacing={2}>
        {currentPage !== 1 && (
          <PaginatedItems>
            <Link href={handlePageLink(currentPage - 1)}>
              <FiChevronLeft />
            </Link>
          </PaginatedItems>
        )}
        {handlePaginate().map((page, index) => (
          <PaginatedItems key={page}>
            {page !== "..." ? (
              <Link
                href={handlePageLink(page)}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </Link>
            ) : (
              <Box className="break">{page}</Box>
            )}
          </PaginatedItems>
        ))}
        {currentPage < totalPage && (
          <PaginatedItems>
            <Link href={handlePageLink(currentPage + 1)}>
              <FiChevronRight />
            </Link>
          </PaginatedItems>
        )}
      </HStack>
    </>
  );
}

function PaginatedItems({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box as="li" color="white.100" className="page-paginate">
        {children}
      </Box>
    </>
  );
}
