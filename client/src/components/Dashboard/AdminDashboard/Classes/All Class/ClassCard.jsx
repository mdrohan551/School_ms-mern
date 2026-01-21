import React, {useState} from "react";
import {GraduationCap, Edit, Trash2, Eye} from "lucide-react"; // Import Eye for view link
import {Link} from "react-router-dom";
import ClasseUpdate from "../New Classe/ClasseUpdate";
import toast from "react-hot-toast";
import {useGetAllEmployeesQuery} from "../../../../../redux/Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";
import {useUpdateClassMutation} from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";
import UpdateForm from "../New Classe/UpdateForm.jsx";

import Winner from "./winner.jsx";
const ClassCard = ({subjectName, totalCount, id, HandleDelte, isWinner, isSecond, isThird}) => {
    const {data: allEmployee, isLoading: employeLoading, error: employeeError, refetch} = useGetAllEmployeesQuery();
    const [UpdateClass, {isLoading: classLoading, error}] = useUpdateClassMutation()
    if (employeeError) {
        toast.error("something went wrong!")
        refetch()

    }

    const [isOpen, setIsOpen] = useState(false);

    const percent = Math.min(100, Math.round((totalCount / 100) * 100));
    // You might want to get these stats from the actual class data, not hardcode them.
    const getColorClass = (percent) => {
        if (percent >= 75) return "text-green-500";
        if (percent >= 50) return "text-blue-500";
        if (percent >= 25) return "text-yellow-400";
        return "text-red-500";
    };
    let bgClass = "";
    if (isWinner) bgClass = "bg-yellow-50 dark:bg-orange-500/10 ring ring-yellow-400 dark:ring-yellow-300/70 "; // Top with badge
    else if (isSecond) bgClass = "bg-blue-500/10 ";  // ২য় এর bg
    else if (isThird) bgClass = "bg-gray-200/50 dark:bg-gray-200/5";   // ৩য় এর bg
    return (
        <tr className={`shadow   dark:ring dark:ring-gray-500 transition-colors mb-3 block md:table-row ${bgClass}`}>
            {/* Class Name with icon */}
            <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base font-medium  text-gray-800 dark:text-white flex items-center gap-3 relative">
                <GraduationCap className="text-indigo-500 w-5 h-5 sm:w-6 sm:h-6"/>
                <span>{subjectName}</span>
                {isWinner && <Winner />}




            </td>

            {/* Student Count */}
            <td className="px-4 py-3 sm:px-6 sm:py-4 text-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {totalCount} {/* This should ideally come from your class data */}
            </td>
            <td className="px-4 py-3 sm:px-6 sm:py-4 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto relative">
                    <svg className="w-full h-full" viewBox="0 0 64 64">
                        <circle
                            className="text-gray-300"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="transparent"
                            r="28"
                            cx="32"
                            cy="32"
                        />
                        <circle
                            className={getColorClass(percent)}
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="transparent"
                            strokeDasharray={176}
                            strokeDashoffset={176 - (176 * percent) / 100}
                            strokeLinecap="round"
                            r="28"
                            cx="32"
                            cy="32"
                        />
                    </svg>
                    <div
                        className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-white">
                        {percent}%
                    </div>
                </div>
            </td>


            {/* Actions (Edit & Delete) */}
            <td className="px-4 py-3 sm:px-6 sm:py-4 text-center">
                <Link
                    to={`/dashboard/allstudent?class_id=${id}&class_name=${encodeURIComponent(subjectName)}`}
                    className="inline-flex items-center gap-1 text-sm sm:text-base text-indigo-600 dark:text-gray-300 hover:underline hover:text-indigo-700 transition"
                >
                    <Eye size={16} className="sm:w-5 sm:h-5"/> View
                </Link>
            </td>

            {/* Details/View Link */}
            <td className="px-4 py-3 sm:px-6 sm:py-4 text-center">


                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-blue-500 hover:text-blue-600 transition"
                        title="Edit"
                    >
                        <Edit size={16} className="sm:w-5 sm:h-5"/>
                    </button>


                    <ClasseUpdate isOpen={isOpen}>
                        <UpdateForm onClose={() => setIsOpen(false)} allEmployee={allEmployee}
                                    employeLoading={employeLoading} updateClass={UpdateClass}
                                    classLoading={classLoading} classError={error} classID={id}/>


                    </ClasseUpdate>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            HandleDelte(id);
                        }}
                        className="text-red-500 hover:text-red-600 transition"
                        title="Delete"
                    >
                        <Trash2 size={16} className="sm:w-5 sm:h-5"/>
                    </button>
                </div>
            </td>
        </tr>);
};

export default ClassCard;