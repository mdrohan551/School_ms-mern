import React from 'react';
import DashboardLayout from "../../../Layouts/DashboardLayout.jsx";
import StudentAttendenceReport
    from "../../../components/Dashboard/AdminDashboard/Attendence/StudentsAttendenceReport/StudentAttendenceReport.jsx";

const StudentsAttendenceReportPage = () => {
    return (
     <div >
             <StudentAttendenceReport/>
     </div>
    );
};

export default StudentsAttendenceReportPage;