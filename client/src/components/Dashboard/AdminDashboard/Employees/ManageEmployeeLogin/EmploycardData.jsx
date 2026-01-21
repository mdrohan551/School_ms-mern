import React, {useState} from 'react';
import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/fa";

const EmploycardData = () => {

    const [IDclick, setIDclick] = useState(true);
    const [Staffclick, setStaffclick] = useState(true);
    const [Roleclick, setRoleclick] = useState(true);
    const [Usernameclick, setUsernameclick] = useState(true);
    const [Passwordclick, setPasswordclick] = useState(true);
    const [Actionclick, setActionclick] = useState(true);


    const handleIDClick = () => {
        setIDclick(prev => !prev);
    }
    const handleStaffClick = () => {
        setStaffclick(prev => !prev);
    }
    const handleRoleClick = () => {
        setRoleclick(prev => !prev);
    }
    const handleUsernameClick = () => {
        setUsernameclick(prev => !prev);
    }
    const handlePasswordClick = () => {
        setPasswordclick(prev => !prev);
    }
    const handleActionClick = () => {
        setActionclick(prev => !prev);
    }

    return (
        <div>
            <div
                className="p-3 rounded-md shadow bg-gray-200 border-b border-gray-400 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 cursor-pointer shadow-md mt-7 overflow-x-auto text-sm sm:text-base">
                <div onClick={handleIDClick} className="flex items-center space-x-4 min-w-[120px]">
                    <h1 className="font-semibold">ID</h1>
                    <div className="flex items-center">
                        <FaLongArrowAltUp className={`${IDclick ? "text-white" : "text-gray-400"}`}/>
                        <FaLongArrowAltDown className={`${!IDclick ? "text-white" : "text-gray-400"}`}/>
                    </div>
                </div>

                <div onClick={handleStaffClick} className="flex items-center space-x-4 min-w-[160px]">
                    <h1 className="font-semibold">Staff Name</h1>
                    <div className="flex items-center">
                        <FaLongArrowAltUp className={`${Staffclick ? "text-white" : "text-gray-400"}`}/>
                        <FaLongArrowAltDown className={`${!Staffclick ? "text-white" : "text-gray-400"}`}/>
                    </div>
                </div>

                <div onClick={handleRoleClick} className="flex items-center space-x-4 min-w-[130px]">
                    <h1 className="font-semibold">Role</h1>
                    <div className="flex items-center">
                        <FaLongArrowAltUp className={`${Roleclick ? "text-white" : "text-gray-400"}`}/>
                        <FaLongArrowAltDown className={`${!Roleclick ? "text-white" : "text-gray-400"}`}/>
                    </div>
                </div>

                <div onClick={handleUsernameClick} className="flex items-center space-x-4 min-w-[150px]">
                    <h1 className="font-semibold">Username</h1>
                    <div className="flex items-center">
                        <FaLongArrowAltUp className={`${Usernameclick ? "text-white" : "text-gray-400"}`}/>
                        <FaLongArrowAltDown className={`${!Usernameclick ? "text-white" : "text-gray-400"}`}/>
                    </div>
                </div>

                <div onClick={handlePasswordClick} className="flex items-center space-x-4 min-w-[150px]">
                    <h1 className="font-semibold">Password</h1>
                    <div className="flex items-center">
                        <FaLongArrowAltUp className={`${Passwordclick ? "text-white" : "text-gray-400"}`}/>
                        <FaLongArrowAltDown className={`${!Passwordclick ? "text-white" : "text-gray-400"}`}/>
                    </div>
                </div>

                <div onClick={handleActionClick} className="flex items-center space-x-4 min-w-[120px]">
                    <h1 className="font-semibold">Actions</h1>
                    <div className="flex items-center">
                        <FaLongArrowAltUp className={`${Actionclick ? "text-white" : "text-gray-400"}`}/>
                        <FaLongArrowAltDown className={`${!Actionclick ? "text-white" : "text-gray-400"}`}/>
                    </div>
                </div>
            </div>
            <h1 className="flex items-center text-gray-500 justify-center text-sm sm:text-xl mt-9">No data available in
                table</h1>
            <hr className="mt-5"/>
            <div
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-7 text-sm sm:text-base">
                <h1>Showing 0 to 0 of 0 entries</h1>
                <div className="flex items-center gap-6 md:gap-12 text-gray-500">
                    <button
                        disabled
                        className="disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        disabled
                        className="disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmploycardData;