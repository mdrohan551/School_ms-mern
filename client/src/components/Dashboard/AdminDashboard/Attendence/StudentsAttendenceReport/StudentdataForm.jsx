import React from 'react';
import StudentattendenceData from "./StudentattendenceData.jsx";

const StudentdataForm = ({ data, isLoading, isError }) => {
    return (
        <div className="shadow rounded-3xl p-5 mt-8 dark:bg-white/5">


            {isLoading ? (
                <p>Loading attendance data...</p>
            ) : isError ? (
                <p className="text-red-500">Failed to load data.</p>
            ) : (
                <StudentattendenceData attendanceData={data} />
            )}
        </div>
    );
};

export default StudentdataForm;