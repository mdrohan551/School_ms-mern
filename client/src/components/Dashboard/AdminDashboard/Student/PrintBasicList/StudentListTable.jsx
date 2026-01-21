import React from 'react';
import { LuUserRound } from "react-icons/lu";
import StudentIdCardStyleButton from "./StudentIdCardStyleButton.jsx";

const StudentListTable = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white dark:bg-gray-100/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-xl font-medium">Students</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <LuUserRound className="text-xl"/>
                        <p className="text-xl">- Student table List</p>
                    </div>
                </div>
            </div>
            <div className="max-w-full mx-auto mr-6">
                <StudentIdCardStyleButton/>
            </div>
        </div>
    );
};

export default StudentListTable;