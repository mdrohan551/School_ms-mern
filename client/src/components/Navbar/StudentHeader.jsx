import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
    ChevronDown,
    Ellipsis,
    LockKeyhole,
    Menu,
    Settings,
    School
} from 'lucide-react';

import DarkMoodButton from "../../homePage/HomeNav/DarkMoodButton.jsx";

const StudentHeader = ({toggle, setToggle, logout, isLoading}) => {

    // Manage State
    const [dropdown, setDropdown] = useState(false);
    // Handle dropdown
    const handleDropdown = () => {
        setDropdown(!dropdown)
    }


    return (
        <header
            className={`text-gray-600 
            body-font fixed 
            bg-indigo-400 
            dark:bg-[#06183b]
            shadow 
            dark:shadow-lg dark:shadow-gray-800
            w-full 
            max-sm:py-2 
            z-30
           `}
        >
            <div className="flex flex-wrap justify-between py-1 px-[4px] sm:p-5 items-center">
                {/* Logo side  */}
                <div
                    className='
                    flex
                    gap-4
                    md:gap-13
                    max-md:ml-4
                    max-md:justify-around
                    max-md:w-[58vw]
                    overflow-hidden'
                >
                    <button onClick={() => setToggle(!toggle)} className='cursor-pointer text-white'>
                        <Menu className='w-5 md:w-6'/>

                    </button>
                    <Link to="/dashboard">
                        <h1 className='text-2xl text-gray-50 dark:text-gray-300 font-bold '>Home<span className="text-red-400 dark:text-indigo-400  ">Edu</span><span className='text-red-400 '>.</span></h1>
                    </Link>
                </div>


                {/* Dropdown  */}
                <div className={`relative ml-auto  `}>
                    <div className="flex">
                        <button
                            onClick={handleDropdown}
                            className='
                        flex justify-center rounded
                        text-dark
                        cursor-pointer gap-3 items-center text-white
                        px-3 py-1'
                        >
                            <School className='h-5 w-5'/>
                            <h4 className=" sm:block hidden"> Chandpur Govt College</h4>
                            <ChevronDown className='h-4 w-4'/>
                        </button>
                        <div
                            className='flex rounded gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 items-center px-2 py-1'>
                            <DarkMoodButton className="cursor-pointer"/>
                        </div>
                    </div>
                    <div
                        className={`
                            absolute gap-1.5 w-55 py-2 
                             bg-gradient-to-r from-[#ffffff] to-[#ffffff] dark:from-[#09327f] dark:to-[#06183b] text-black dark:text-white border border-gray-300 
                            flex-col justify-center mt-3 
                            rounded text-lg transition-all 
                             sm:right-0 right-3
                            ease-in-out 
                            duration-500
                            ${dropdown ? "opacity-100 block" : " opacity-0 hidden"}`}>
                        <div
                            className='flex rounded gap-3 hover:bg-gray-100 dark:hover:text-black items-center px-2 py-1'>
                            <Settings className='h-5 w-5'/>
                            <Link to="/dashboard/account-settings">Account Settings</Link>
                        </div>
                        <div
                             className='flex cursor-pointer rounded gap-3 hover:bg-gray-100 dark:hover:text-black  items-center px-2 py-1'>
                            <LockKeyhole className='h-5 w-5'/>
                            <button onClick={logout}>{isLoading ? "loading..." : "logout"}</button>
                        </div>


                    </div>
                </div>
            </div>
        </header>
    );
};

export default StudentHeader;