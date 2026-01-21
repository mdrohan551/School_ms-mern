import React from 'react';
import EarnCard from "./Earncard/EarnCard.jsx";
import ManageChart from "./StatisticsChart/ManageChart.jsx";
import Estimated from './EstimatedFee/Estimated.jsx';
import ProgressData from './ProgressAll/progressData.jsx';
import CalenderPage from './Calender/CalenderPage.jsx';
import {useGetAllAttendanceQuery} from "../../../../redux/Features/AttandenceCreate/attendanceCreateAdmin.js";
import StudentAbsent from "./AbsentPresent/StudentAbsent.jsx";


const DashboardHome = () => {
    const {data: attendanceData, isLoading, isError,refetch} = useGetAllAttendanceQuery();
     let Allattendance= attendanceData?.data;
    return (
        <div className=' '>
            <EarnCard/>
            <div className=" grid gap-6 lg:grid-cols-3 mt-7">
                <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-600 shadow-md rounded-lg ">
                    <ManageChart/>
                    <StudentAbsent Allattendance={Allattendance}/>
                </div>
                <div className="lg:col-span-1 ">
                  <Estimated/>
                  <ProgressData/>
                  <CalenderPage/>
                </div>
               
            </div>
        </div>

    );
};

export default DashboardHome;
