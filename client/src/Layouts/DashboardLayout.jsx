import React, {useState} from "react";
import Header from "../components/Navbar/Header.jsx";
import Sidebar from "../components/Dashboard/AdminDashboard/sidebar/Sidebar.jsx";
import StudentHeader from "../components/Navbar/StudentHeader.jsx";
import {Outlet, useNavigate} from 'react-router-dom';
import StudentSidebar from "../components/Dashboard/StudentDashboard/StudentSidebar/StudentSidebar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Logout} from "../redux/slice/authSlice.js";
import toast from "react-hot-toast";
import {useLogoutUserMutation} from "../redux/Features/auth/AuthApi.js";
const Layout = () => {
    const [toggle, setToggle] = useState(false);
    const currentRole = useSelector((state) => state.auth.role);
    const [logoutUser, {isLoading}] = useLogoutUserMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            let res = await logoutUser().unwrap();
            if (res.status === "success") {
                dispatch(Logout())
                navigate("/login");
                toast.success("Logout successful");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <section className="flex h-screen w-full">
                {/* Header */}
                {
                    currentRole === "Admin" ? (<Header toggle={toggle} setToggle={setToggle} logout={logoutHandler} isLoading={isLoading}/>) : (<StudentHeader toggle={toggle} setToggle={setToggle} logout={logoutHandler} isLoading={isLoading}/>)
                }
                {/* Sidebar */}
                <div className={`
            custom-scrollbar 
            shadow-[1px_0px_2px_#00000041] 
            overflow-y-auto 
            h-screen 
            w-[260px]
            bg-gray-50 dark:bg-gray-900
            transition-all
            ease-in-out
            duration-300
            max-md:z-[25]
            ${toggle ? "-translate-x-72 max-md:fixed":""}`}>{currentRole === "Admin" ? <Sidebar/> : <StudentSidebar/>}</div>
                {/* Main Content */}
                <div className={` bg-gradient-to-r from-[#ffffff] to-[#ffffff] dark:from-[#06183b] dark:to-[#06183b] text-black dark:text-white
            flex-1 overflow-y-auto pt-24 
            pl-0 sm:pl-4 w-full 
            transition-all ease-in-out duration-300  
            md:relative max-md:fixed max-md:left-0 
            max-md:top-0 max-md:h-full max-md:z-20
            ${toggle ? " md:ml-[-250px] max-md:translate-x-0 " : "max-md:bg-[#00000069] "}
          `}
                >
                    <Outlet/>
                </div>
            </section>
        </>
    );
};
export default Layout;