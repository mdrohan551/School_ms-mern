// src/components/ManageChart.jsx
import DynamicIncomeChart from "./DynamicIncomeChart.jsx";
import ClassPrasentStudnet from "./ClassPrasentStudnet.jsx";
import React, { useEffect, useState } from "react";
import {useGetAttendanceSummaryQuery} from "../../../../../redux/Features/AttandenceCreate/attendanceCreateAdmin.js";

const ManageChart = () => {

    const {data={},isLoading:summaryLoading,refetch}=useGetAttendanceSummaryQuery()



    const [mood, setMood] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === 'dark') {
            setMood(true);
        } else {
            setMood(false);
        }
    }, []);

    return (
        <div className="sm:p-4 p-0">
            {/* Income Chart */}
            <div className="mb-8 bg-white dark:bg-black p-4 rounded-lg shadow text-gray-800 dark:text-gray-100">
                <h1 className="text-center py-5 font-bold capitalize">income chart</h1>
                <DynamicIncomeChart darkMode={mood} />
            </div>

            {/* Attendance Chart */}
            <div className="mb-8 bg-white dark:bg-black p-4 rounded-lg shadow text-gray-800 dark:text-gray-100">
                {!summaryLoading && data?.data?.length > 0 && (
                    <ClassPrasentStudnet darkMode={mood} apiData={data.data} refetch={refetch} />
                )}
            </div>
        </div>
    );
};

export default ManageChart;