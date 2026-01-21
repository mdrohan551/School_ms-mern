import React, {useEffect} from 'react';
import ProgressBar from './ProgressBar';
import { calculate } from '../../../../../constant/CalculatePrasentages';
import { useTodayAttendanceStudentQuery } from "../../../../../redux/Features/AttandenceCreate/attendanceCreateAdmin.js";

const ProgressData = () => {
    const { data = {}, isLoading: summaryLoading, refetch } = useTodayAttendanceStudentQuery();
    useEffect(() => {
        refetch()
    }, [refetch]);
    // Calculate percentage from API data
    const studentPercentage = calculate(data?.data);
    if (summaryLoading) return <h1>today present loading...</h1>
    return (
        <div className="rounded-xl flex justify-start mt-5 py-5">
            <div className="w-full max-w-md space-y-4">
                <ProgressBar title="Today Present Students" value={studentPercentage} />
                <ProgressBar title="Today Present Employees" value={0} color="text-red-500" barColor="bg-red-400" />
                <ProgressBar title="This Month Fee Collection" value={0} />
            </div>
        </div>
    );
};

export default ProgressData;
