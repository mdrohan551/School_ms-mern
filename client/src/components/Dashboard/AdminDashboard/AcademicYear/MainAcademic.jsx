import React from 'react';
import { Link, useSearchParams } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import AcademicYearList from "./AcademicYearList.jsx";
import { Eye } from "lucide-react";
import AcademicYearForm from "./AcademicYear.jsx";

const MainAcademic = () => {
    const [searchParams] = useSearchParams();
    const showAllYears = searchParams.get("all-academic-years") === "true";

    return (
        <>
            <div className="max-w-full mx-auto shadow rounded-xl p-4 flex items-center justify-between mt-4 bg-white dark:bg-gray-900">
                <h1 className="text-[0.7rem] sm:text-lg font-semibold text-gray-800 dark:text-white">
                    Academic Years
                </h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                    <IoHomeOutline />
                    <span className="text-[0.7rem] sm:text-sm">Academic All Data</span>
                    <Link
                        to={`/dashboard/academic-year?all-academic-years=true`}
                        className="flex items-center gap-2 px-3 py-1 rounded-full ring ring-gray-300 dark:ring-gray-600 hover:underline"
                    >
                        View All <Eye size={16} />
                    </Link>
                </div>
            </div>

            {!showAllYears ? <AcademicYearForm /> : <AcademicYearList />}
        </>
    );
};

export default MainAcademic;
