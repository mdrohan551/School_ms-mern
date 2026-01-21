import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import DateForm from "./dateForm.jsx";
import StudentdataForm from "./StudentdataForm.jsx";
import { useGetAllAttendanceQuery } from "../../../../../redux/Features/AttandenceCreate/attendanceCreateAdmin.js";

const StudentAttendenceReport = () => {
    const [selectedDate, setSelectedDate] = useState(null); // single date string like "2025-8-6"

    const { data, isLoading, isError } = useGetAllAttendanceQuery(
        { date: selectedDate }, // now passing { date: "2025-8-6" }
        { refetchOnMountOrArgChange: true }
    );

    return (
        <div>
            <div className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-sm sm:text-xl font-medium">Attendance</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-xl"/>
                        <p className="text-sm sm:text-xl">- Students Attendance Record</p>
                    </div>
                </div>
            </div>

            <div className="max-w-full mx-auto">
                <DateForm onDateChange={setSelectedDate} />

                <div className="mr-8">
                    <StudentdataForm data={data} isLoading={isLoading} isError={isError} />
                </div>
            </div>
        </div>
    );
};

export default StudentAttendenceReport;