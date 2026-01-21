import React from 'react';
import {IoHomeOutline} from "react-icons/io5";
import Manualattendence from "./Manualattendence.jsx";
const StudentAttendence = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex items-center text-start space-x-5 mt-3 ">
                <h1 className="text-xl font-medium">Attendance</h1>
                <div className="flex items-center justify-center space-x-2">
                    <IoHomeOutline className="text-xl"/>
                    <p className="text-xl">- Mark or update Student Attendance</p>
                </div>
            </div>
            <div className="max-w-4xl mx-auto">
                <Manualattendence/>
            </div>
        </div>
    );
};

export default StudentAttendence;