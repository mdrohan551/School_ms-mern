import React from "react";

const StudentCardLoader = () => {
    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md flex flex-col items-center w-full max-w-[170px] animate-pulse border border-gray-200 dark:border-gray-700">
            {/* Profile Skeleton */}
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 mb-2"></div>

            {/* ID Skeleton */}
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 mb-1 rounded"></div>
            {/* Name Skeleton */}
            <div className="h-5 w-20 bg-gray-400 dark:bg-gray-500 mb-3 rounded"></div>

            {/* Actions Skeleton */}
            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
        </div>
    );
};

export default StudentCardLoader;
