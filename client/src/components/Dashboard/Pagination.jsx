import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show: 1 ... prev, current, next ... last
            pageNumbers.push(1);

            if (currentPage > 4) {
                pageNumbers.push('left-ellipsis');
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 3) {
                pageNumbers.push('right-ellipsis');
            }

            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    const handlePageClick = (page) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex justify-center items-center mt-6 space-x-2">
            {/* Prev Button */}
            <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
            >
                <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, idx) => {
                if (page === 'left-ellipsis' || page === 'right-ellipsis') {
                    return (
                        <span key={idx} className="px-2 text-gray-500">
              ...
            </span>
                    );
                }

                return (
                    <button
                        key={idx}
                        onClick={() => handlePageClick(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
                            currentPage === page
                                ? 'bg-purple-700 text-white font-bold'
                                : 'bg-gray-200 text-gray-700 hover:bg-purple-200'
                        }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default Pagination;
