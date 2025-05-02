import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  maxPageButtons?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showFirstLast = true,
  maxPageButtons = 5,
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Calculate range of page buttons to show
  const getPageRange = () => {
    // Calculate how many buttons to show on either side of current page
    const sideButtonCount = Math.floor((maxPageButtons - 1) / 2);
    let startPage = Math.max(1, currentPage - sideButtonCount);
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    // Adjust start if we're near the end
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageRange();

  return (
    <nav
      className={cn("flex justify-center items-center gap-1 py-6", className)}
      aria-label="Pagination"
    >
      {/* First page button */}
      {showFirstLast && (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Previous page button */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Show ellipsis if there are pages before the displayed range */}
      {pageNumbers[0] > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled
        >
          &hellip;
        </Button>
      )}

      {/* Page number buttons */}
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={currentPage === pageNumber ? "default" : "outline"}
          size="icon"
          className={cn(
            "h-8 w-8",
            currentPage === pageNumber 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "hover:bg-secondary/80"
          )}
          onClick={() => onPageChange(pageNumber)}
          aria-label={`Go to page ${pageNumber}`}
          aria-current={currentPage === pageNumber ? "page" : undefined}
        >
          {pageNumber}
        </Button>
      ))}

      {/* Show ellipsis if there are pages after the displayed range */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled
        >
          &hellip;
        </Button>
      )}

      {/* Next page button */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last page button */}
      {showFirstLast && (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  );
};

export default Pagination;