import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, DollarSign, UserRound } from "lucide-react";
import { useGetAllStudentsQuery } from "../../../../../redux/Features/StudentCreateAdmin/StudentCreateAdmin.js";
import { useGetAllEmployeesQuery } from "../../../../../redux/Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";

const mianUrl = 'dashboard';

// কমন ফিল্টার ফাংশন
const filterThisMonth = (dataArray, dateField) => {
    if (!Array.isArray(dataArray)) return [];
    const nowDate = new Date();
    return dataArray.filter(item => {
        const itemDate = new Date(item[dateField]);
        return (
            itemDate.getMonth() === nowDate.getMonth() &&
            itemDate.getFullYear() === nowDate.getFullYear()
        );
    });
};

const EarnCard = () => {
    const { data: studentRes = {}, isLoading: studentLoading } = useGetAllStudentsQuery();
    const { data: empRes = {}, isLoading: empLoading } = useGetAllEmployeesQuery();

    const allStudents = studentRes?.data || [];
    const allEmployees = empRes?.data || [];
    const totalStudents = allStudents.length;
    const totalEmployees = allEmployees.length;

    // এই মাসের স্টুডেন্ট ও এমপ্লয়ি
    const thisMonthStudents = filterThisMonth(allStudents, "dateOfAdmission");
    const thisMonthEmployees = filterThisMonth(allEmployees, "dateOfJoining");

    const contentData = useMemo(() => [
        {
            title: "Total Students",
            moneyCount: totalStudents,
            thisMonthText: "This Month",
            thisMonthValue: thisMonthStudents.length,
            icons: UserRound,
            color: "bg-gradient-to-r from-indigo-600 to-indigo-500 ",
            link: `/${mianUrl}/allstudent`
        },
        {
            title: "Total Employees",
            moneyCount: totalEmployees,
            thisMonthText: "This Month",
            thisMonthValue: thisMonthEmployees.length,
            icons: BriefcaseBusiness,
            color: "bg-gradient-to-r from-purple-400 to-indigo-300 ",
            link: `/${mianUrl}/all-employees`
        },
        {
            title: "Revenue",
            moneyCount: "0",
            thisMonthText: "This Month",
            thisMonthValue: "$ 0",
            icons: DollarSign,
            color: "bg-gradient-to-r from-pink-400 to-rose-400 ",
            link: `/${mianUrl}/balance`
        },
        {
            title: "Total Profit",
            moneyCount: "0",
            thisMonthText: "This Month",
            thisMonthValue: "$ 0",
            icons: DollarSign,
            color: "bg-gradient-to-r from-blue-500 to-indigo-400 ",
            link: `/${mianUrl}/total-profit`
        },
    ], [totalStudents, totalEmployees, thisMonthStudents, thisMonthEmployees]);

    return (
        <div className="px-1 ml-0 grid gap-6 grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {contentData.map((item, index) => (
                <Link
                    key={index}
                    to={item.link}
                    className={`min-h-[140px] rounded-[15px] ${item.color} shadow p-5 flex flex-col justify-between`}
                >
                    <h3 className="text-white text-[14px] font-semibold">{item.title}</h3>
                    <div className="flex justify-between items-center pt-4">
                        <item.icons className="w-6 h-6 text-white" />
                        <span className="text-white text-xl font-bold">
              {studentLoading || empLoading ? "..." : item.moneyCount}
            </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <p className="text-white text-sm">{item.thisMonthText}</p>
                        <p className="text-white text-sm font-medium">
                            {studentLoading || empLoading ? "..." : item.thisMonthValue}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default EarnCard;
