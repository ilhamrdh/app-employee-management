import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface Props {
  paging: {
    page: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

const generatePageNumbers = (totalPages: number, currentPage: number) => {
  const pageNumbers: (number | string)[] = [];
  const pageLimit = 3;
  if (totalPages <= pageLimit) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (start > 1) pageNumbers.push(1);
    if (start > 2) pageNumbers.push('...');

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < totalPages - 1) pageNumbers.push('...');
    if (end < totalPages) pageNumbers.push(totalPages);
  }
  return pageNumbers;
};

const AppPagination = ({ paging, onPageChange }: Props) => {
  const pageNumbers = generatePageNumbers(paging.totalPages, paging.page);
  return (
    <Pagination>
      <PaginationContent className="flex justify-evenly items-center space-x-2 w-full">
        <PaginationItem className={paging.page <= 1 ? 'pointer-events-none cursor-not-allowed opacity-50' : 'cursor-pointer'}>
          <PaginationPrevious onClick={() => onPageChange(paging.page - 1)} aria-disabled={paging.page <= 1} />
        </PaginationItem>

        <div className="flex gap-3">
          {pageNumbers.map((pageNumber, index) => (
            <PaginationItem key={`${index}-${pageNumber}`}>
              {pageNumber === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={paging.page === pageNumber}
                  aria-current={paging.page === pageNumber ? 'page' : undefined}
                  className={paging.page === pageNumber ? 'bg-slate-800 hover:bg-slate-950 hover:text-white text-white' : ''}
                  onClick={() => onPageChange(pageNumber as number)}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        <PaginationItem className={paging.page >= paging.totalPages ? 'pointer-events-none cursor-not-allowed opacity-50' : 'cursor-pointer'}>
          <PaginationNext onClick={() => onPageChange(paging.page + 1)} aria-disabled={paging.page >= paging.totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
