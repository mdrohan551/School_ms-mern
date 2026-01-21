import React, { useEffect, useState } from 'react';
import logo from '../../../public/images/whitelogo.png';
import { Link } from "react-router-dom";
import { UserRoundPlus, Forklift, ChevronDown } from 'lucide-react';
import DeveloperDropDown from "./navDropdown/DeveloperDropDown.jsx";
import DarkMoodButton from './DarkMoodButton.jsx';
import {useSelector} from "react-redux";


const HomeNav = () => {

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [fixnav, setFixnav] = useState(false)
    const role = useSelector((state) => state.auth.role); // ✅ no destructuring
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 20) {
                setFixnav(true)
            } else {
                setFixnav(false)
            }
        })



    }, []);




    // navbar open 
    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);

    }





    return (
        <div className={`${fixnav ? "sticky top-0 z-20 lg:static" : ""}
 bg-gradient-to-r from-[#ffffff] to-[#ffffff] dark:from-[#09327f] dark:to-[#06183b] text-black dark:text-white shadow-xl shadow-gray-600/5`}>

            <nav className="max-w-[1440px] container mx-auto px-4 flex justify-between items-center">
                <div className="basis-2/5 sm:basis-1/5 h-auto flex justify-start py-4 ">
                    <div className=" w-17 h-auto sm:w-30">
                        <img src={logo} className="w-full h-full mix-blend-difference" alt="logo" />

                    </div>
                </div>
                <div className='sm:hidden flex items-center justify-end basis-2/5 sm:basis-1/5' onClick={toggleNavbar}>
                    <div className={`toggle ${navbarOpen ? "rotate-45" : ""} transition-transform duration-300`}>
                        <div className={`bars bg-black dark:bg-white h-[2px] w-7  absolute top-1/2 left-0 transition-all duration-300 ${navbarOpen ? "rotate-45" : "-translate-y-2"}`} id="bar1"></div>
                        <div className={`bars bg-black dark:bg-white h-[2px] w-7  absolute top-1/2 left-0 transition-all duration-300 ${navbarOpen ? "opacity-0" : ""}`} id="bar2"></div>
                        <div className={`bars bg-black dark:bg-white h-[2px] w-7  absolute top-1/2 left-0 transition-all duration-300 ${navbarOpen ? "-rotate-45" : "translate-y-2"}`} id="bar3"></div>
                    </div>
                </div>

                <header className={`
    basis-3/5 sm:basis-4/5 justify-between flex flex-col sm:flex-row
    fixed top-16 left-0 w-full sm:static sm:w-auto
    transition-all duration-300 z-40
    ${navbarOpen ? "flex translate-x-0  bg-gradient-to-r  from-[#fff] to-[#ddd] dark:from-[#000] dark:to-[#120774]  px-5 py-8" : "hidden -translate-x-full"}
    sm:flex sm:translate-x-0 sm:bg-transparent
    `} onClick={() => setNavbarOpen(false)}

                >
                    <div>
                        <ul className="flex flex-col sm:flex-row gap-5 sm:gap-6 text-black dark:text-white py-2 capitalize text-sm relative sm:flex">
                            <li className="group flex items-center gap-1 relative">
                                <Link to='' className="flex items-center gap-1">
                                    developer <ChevronDown size={20} />
                                </Link>
                                <div
                                    className="
        absolute -left-3 sm:-left-32 top-[0rem] sm:top-[2rem] min-w-[320px] w-fit
        opacity-0 invisible scale-y-90
        group-hover:opacity-100 group-hover:visible group-hover:scale-y-100
        transition-all duration-300 origin-top 
        pointer-events-auto 
         
    "
                                >                    <DeveloperDropDown />
                                </div>
                            </li>
                            <li><Link to='' className="flex">help</Link></li>
                        </ul>
                    </div>
                    <div className="navbar pt-5 sm:pt-0">
                        <ul className="flex flex-col justify-around sm:flex-row  text-white md:gap-5 sm:gap-3 gap-5">
                            <Link to="/signUp" className="w-35 sm:w-31 px-0 sm:px-6 py-2 hover:bg-transparent hover:ring-red-700 ring-1 ring-transparent  hover:text-red-600 transition-all duration-200 ease-linear bg-red-700 rounded-xl text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] "><li className='flex sm:justify-around justify-center items-center gap-1' ><UserRoundPlus size={16} />sign up</li></Link>
                            <Link to={(role === "Admin" || role === "Student" || role === "Employee")?`/dashboard/${role}` :'/login'} className="w-35 sm:w-31 px-0 sm:px-6 py-2 bg-white ring-1 ring-gray-400 dark:ring-0 hover:bg-blue-500  hover:text-white transition-all duration-200 ease-linear rounded-xl  text-black text-[0.9rem]"><li className='flex sm:justify-around justify-center items-center gap-1 text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] ' ><Forklift size={20} />Login</li></Link>
                            <DarkMoodButton className='cursor-pointer w-10 sm:w-10 py-2 ring px-2 ring-gray-500 rounded-xl hover:ring-white text-black dark:text-white' />
                        </ul>
                    </div>


                </header>
            </nav>
        </div>
    );
};

export default HomeNav;