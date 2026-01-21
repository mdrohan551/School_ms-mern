import {useState} from 'react';
import {Link} from 'react-router-dom';
import {
    ChevronDown,
    CircleX,

    Landmark,
    LockKeyhole,
    Menu,
    Search,
    Settings,
    School
} from 'lucide-react';

import DarkMoodButton from "../../homePage/HomeNav/DarkMoodButton.jsx";
import {useGetSchoolSingleDetailsQuery} from "../../redux/Features/SchoolAdmin/GeneralSettingsApi.js";

const Header = ({setToggle, toggle, logout, isLoading}) => {
    const {data, isLoading: detailloading, error, refetch} = useGetSchoolSingleDetailsQuery()
    // Manage State
    const [searchToggler, setSearch] = useState(false);
    const [dropdown, setDropdown] = useState(false);


    // Handle search field
    const handleSearch = () => {
        setSearch(true)
    }

    // Handle dropdown
    const handleDropdown = () => {
        setDropdown(!dropdown)
    }


    return (
        <header
            className={`
            body-font fixed 
         bg-gradient-to-r from-[#ffffff] to-[#ffffff] dark:from-[#09327f] dark:to-[#06183b] text-black dark:text-white shadow-xl shadow-gray-600/5
        
            w-full 
            max-sm:py-2 
            z-999
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
                    <button onClick={() => setToggle(!toggle)} className='cursor-pointer'>
                        <Menu className='w-5 md:w-6'/>

                    </button>
                    <Link to="/dashboard">
                        <h1 className='text-2xl text-gray-500 dark:text-gray-300 font-bold '>Home<span
                            className="text-indigo-400 ">Edu</span><span className='text-red-400 '>.</span></h1>
                    </Link>
                </div>

                {/* Searchbar  */}
                <div className='rounded w-40 gap-3 hidden md:flex md:w-60 ml-auto px-1 py-1'>
                    <button
                        onClick={() => setSearch(false)}
                        type='button'
                        className={`cursor-pointer  ${searchToggler ? "" : "hidden"}`}
                    >
                        {/* Cross Icon  */}
                        <CircleX className='h-5 w-5'/>
                    </button>
                    <input
                        className={`
                        text-md 
                        focus:outline-none 
                        px-1 
                        rounded 
                        duration-500 
                        ease-linear 
                        ${searchToggler ? "w-full h-full" : "w-0"}`}
                        type="text"
                        name="search"
                        placeholder='Search Student'
                    />
                    <button onClick={handleSearch} type='button' className='cursor-pointer'>
                        <Search className='h-5 w-5'/>
                    </button>
                </div>

                {/* Small device toggler  */}


                {/* Dropdown  */}
                <div className={`relative ml-auto flex `}>
                    <button
                        onClick={handleDropdown}
                        className='
                        flex justify-center rounded
                        text-dark
                        cursor-pointer gap-3 items-center
                        px-3 py-1'
                    >
                        {data?.data?.[0]?.logoImage ? (
                            <img src={data.data[0].logoImage} className="w-8 h-8" alt="logo" />
                        ) : (
                            <School className="h-5 w-5" />
                        )}



                        <h4 className=" sm:block hidden">{data?.data?.[0]?.instituteName ? data?.data?.[0]?.instituteName : "Hurry up  🎉" }</h4>
                        <ChevronDown className='h-4 w-4'/>
                    </button>
                    <div
                        className='flex rounded gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 items-center px-2 py-1'>
                        <DarkMoodButton className="cursor-pointer"/>


                    </div>
                    <div
                        className={`
                            absolute gap-1.5 w-55 py-2 
                         bg-gradient-to-r from-[#ffffff] to-[#ffffff] dark:from-[#09327f] dark:to-[#06183b] text-black dark:text-white shadow-xl shadow-gray-600/5border border-gray-300 
                            flex-col justify-center mt-10 
                            rounded text-lg transition-all 
                            sm:right-0 right-3
                            ease-in-out 
                            duration-500
                            ${dropdown ? "opacity-100 block" : " opacity-0 hidden"}`}>
                        <div
                            className='flex rounded gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 items-center px-2 py-1'>
                            <Settings className='h-5 w-5'/>
                            <Link to="/dashboard/account-settings">Account Settings</Link>
                        </div>
                        <div
                            className='flex rounded gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 items-center px-2 py-1'>
                            <Landmark className='h-5 w-5'/>
                            <Link to="/dashboard/institute-profile">Profile</Link>
                        </div>
                        <div
                            className='flex rounded gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 items-center px-2 py-1'>
                            <LockKeyhole className='h-5 w-5'/>
                            <button onClick={logout}>{isLoading ? "loading..." : "logout"}</button>


                        </div>

                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;