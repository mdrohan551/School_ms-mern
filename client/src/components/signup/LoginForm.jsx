import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import LoginTab from './LoginTab';
import Input from './Input';
import Button from './Button';

import { GraduationCap, User, Users, LockKeyhole, Mail, Pen } from 'lucide-react';
import { useLoginUserMutation } from "../../redux/Features/auth/AuthApi.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slice/authSlice.js";


const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role); // ✅ no destructuring
    /* -------------------Manging Login Tab------------------ */
    // Manage state for tab selection
    const [showPass,setShowPass] = useState(false);
    const [selectedRole, setSelectedRole] = useState("Admin");
    const [getError, setError] = useState({
        email: "", userName: "", password: ""
    });

    // call login api method from redux

    const [loginUser, { isLoading }] = useLoginUserMutation()


    /*--------------------------Managing FormSection---------------------- */
    // Manage form state
    const [formData, setFormData] = useState({
        email: "", userName: "", role: "Admin", password: "", rememberMe: false
    })
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setFormData((prevData) => ({
            ...prevData, role: role
        }));
    };
    // checked user
    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.checked
        });
    };

    // Set input value on onChange (handleChange)
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    // validation helper
    const validation = () => {
        const newErrors = {}
        let email_or_Name = selectedRole === "Admin" ? formData.email : formData.userName;
        if (!email_or_Name) {
            selectedRole === "Admin" ? newErrors.email = "Type your email" : newErrors.userName = "Type your userName";
        }
        if (!formData.password) {
            newErrors.password = "Type your password"
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0

    }
    // handle form onSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // যদি validation ফেইল করে তাহলে return করে ফেলো
        const isValid = validation();
        if (!isValid) return;

        const AuthData = {
            role: formData.role,
            password: formData.password, ...(formData.role === "Admin" ? { email: formData.email } : { userName: formData.userName }),
        };

        try {
            let res = await loginUser(AuthData).unwrap();

            if (res.status === true) {
                dispatch(setUser({
                    userLockId: res.userLockId, rememberMe: formData.rememberMe, // ✅ pass to reducer
                }));
                toast.success(res.message);
                navigate("/dashboard");
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            toast.error(err?.data?.message || "Login failed");
        }
    };
    return (<section className=''>
        <div className='flex-center flex-col max-w-[90%] md:max-w-65 mx-auto sm:pb-3 pb-40 '>
            <p className='text-center text-gray-500 text-sm font-semibold'>I am</p>

            {/* ---------Tab: Admin, Employee, Student---------  */}
            <div className='flex justify-center gap-2 pt-3 '>
                {["Admin", "Employee", "Student"].map((role, idx) => (<div
                    key={idx}
                    onClick={() => handleRoleSelect(role)}
                    className={`login-tab ${selectedRole === role ? "bg-junglegreen-darken text-white border-1 border-junglegreen-darken" : ""}`}
                >
                    <LoginTab
                        icon={role === "Admin" ? User : role === "Employee" ? Users : GraduationCap}
                        iconStyle={selectedRole === role ? "text-white" : ""}
                        textStyle={selectedRole === role ? "text-white mt-1 font-bold" : "text-gray-400 mt-1 font-bold"}
                        text={role}
                    />
                </div>))}
            </div>
            {/* ------------Login FormSection-----------------  */}
            <form onSubmit={handleSubmit} className=''>
                <div className='flex flex-col gap-y-4 pt-7 max-w-[300px] mx-auto dark:text-white'>
                    {/* Email/UserName Error Message */}
                    <span
                        className={`relative h-5 overflow-hidden text-[0.7rem] text-red-600 ${(selectedRole === "Admin" && getError.email) || (selectedRole !== "Admin" && getError.userName) ? "block" : "hidden"}`}
                    >
                        {selectedRole === "Admin" && getError.email && (
                            <i className="animate-slide-bottom">{getError.email}</i>)}
                        {selectedRole !== "Admin" && getError.userName && (
                            <i className="animate-slide-bottom">{getError.userName}</i>)}
                    </span>
                    {/* Email input */}
                    <Input
                        inputStyle="w-[25px]"
                        type={selectedRole === "Admin" ? "email" : "text"}  // Dynamic type
                        icon={selectedRole === "Admin" ? Mail : Pen}
                        alt="Email Icon"
                        placeholder={selectedRole === "Admin" ? "Admin Email *" : "Your ID or Username *"}
                        divStyle='border-gray-400'
                        name={selectedRole === "Admin" ? "email" : "userName"} // ✅ input name change
                        value={selectedRole === "Admin" ? formData.email : formData.userName} // ✅ dynamic value
                        onChange={handleChange}
                        autoComplete={selectedRole === "Admin" ? "email" : "username"}
                    />
                    {/* Password input */}
                    {/* Password Error Message */}
                    <span
                        className={`relative h-5 overflow-hidden text-[0.7rem] text-red-600 ${getError.password ? "block" : "hidden"}`}><i
                            className="animate-slide-bottom">{getError.password}</i>
                    </span>

                   <div className="relative">
                       <Input
                           inputStyle="w-[25px]"
                           type={showPass ? "text" : "password"}
                           icon={LockKeyhole}
                           alt="Password Icon"
                           placeholder="Choose Password *"
                           divStyle=''
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                           autoComplete="current-password"
                       />
                       <div onClick={()=>(setShowPass(!showPass))}>
                           {showPass?<EyeOff size={17} className='absolute right-5 top-3 '/>: <Eye size={17} className='absolute right-5 top-3 '/>}
                       </div>
                   </div>
                </div>




                {/* ========================demo login========================= */}

                {/* ======================== Demo Login ========================= */}
                <div className="mt-5 cursor-pointer ring ring-gray-700/50 dark:ring-amber-50/50 p-2 relative group overflow-hidden"
                >
                    <p className="text-gray-800 dark:text-gray-50 text-[0.8rem]">
                        Email: <span className="ml-2">demo@gmail.com</span>
                    </p>
                    <p className="text-gray-800 dark:text-gray-50 text-[0.8rem]">
                        Password: <span className="ml-2">******</span>
                    </p>
                    <div onClick={() => {
                        setFormData((prev) => ({
                            ...prev,
                            email: selectedRole === "Admin" ? "demo@gmail.com" : "",
                            userName: selectedRole !== "Admin" ? "demoUser" : "",
                            password: "******",
                        }));
                    }} className="w-full bg-junglegreen-darken h-full absolute top-0 left-0 flex justify-center items-center translate-y-15 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-white font-bold capitalize">click to demo login</span>
                    </div>
                </div>













                {/* ------------Remember Me, Forgot Password, Signup -----------------  */}
                <label className="flex gap-2 pt-5">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleCheckboxChange}
                        className="checked:bg-teal-bright"
                    />
                    <span className="text-gray-500 dark:text-gray-50  text-sm inline-block">Remember Me</span>
                </label>
                <div className="flex items-center">
                    <Button
                        style="
                                max-w-md mx-auto block mt-7
                                px-10 py-2 bg-junglegreen-bright
                                ease-linear duration-200
                                hover:shadow hover:shadow-teal-white
                                text-[17px] font-semibold">
                        {(role === "Admin" || role === "Student" || role === "Employee") ? (
                            <Link to={`/dashboard/${role}`}>Already Logged
                                In</Link>) : isLoading ? "Loading..." : "Login"}
                    </Button>
                </div>
            </form>
            {/* -----------Forget password--------------  */}
            <Link
                to='/reset-password'
                className='
                            text-sm text-gray-500 dark:text-gray-50
                            hover:text-teal-darken 
                            text-center mt-6'>
                Forget password ?
            </Link>
        </div>
    </section>);
};

export default LoginForm;