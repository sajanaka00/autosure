import React from 'react';
import { ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    // Always show first page
    if (totalPages > 0) pages.push(1);

    // Add current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) pages.push(i);
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

    return (
        <div className="vehicles-sale-pagination">
            {pages.map((page, index) => (
                <React.Fragment key={page}>
                    {index > 0 && pages[index - 1] !== page - 1 && (
                        <span className="vehicles-sale-pagination-ellipsis">...</span>
                    )}
                    <button
                        className={`vehicles-sale-pagination-btn ${currentPage === page ? 'vehicles-sale-pagination-active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                </React.Fragment>
            ))}

            {currentPage < totalPages && (
                <button
                    className="vehicles-sale-pagination-btn vehicles-sale-pagination-next"
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight className="vehicles-sale-pagination-icon" />
                </button>
            )}
        </div>
    );
};

export default Pagination;
