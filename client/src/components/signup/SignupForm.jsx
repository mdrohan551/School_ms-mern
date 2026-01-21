import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from './Input';
import TextAnimation from './TextAnimation';
import Button from './Button';
import { signup } from '../../constant/authData';
import DarkTheme from './DarkTheme';
import toast from "react-hot-toast";
import { useRegisterUserMutation } from "../../redux/Features/auth/AuthApi.js";
import {MoveRight} from "lucide-react"

const SignupForm = () => {
    const navigate = useNavigate();
    // call api fnc from redux
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    // manage error message
    const [errors, setErrors] = useState({});
    // terms conditions click
    const [terms, setTerms] = useState(false);
    // Manage form state
    const [formData, setFormData] = useState({
        email: "", password: "", confirmPassword: ""
    })

// userLockId: Date.now().toString() + Math.random().toString(36).substring(2, 10)
    // Set input value on onChange (handleChange)
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    // handle form onSubmit
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
         else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            let res = registerUser(formData).unwrap(); // res = { message: "...", status: false, statusCode: 400 }

            toast.promise(res, {
                loading: "processing...",
                success: (res) => {
                    navigate("/login");
                    return res.message || "Registration successful!";
                },
                error: (err) => err?.data?.message || "Registration failed!",
            })

        } catch (err) {
            // RTK Query automatically throws structured error when using unwrap
            if (err?.status === 400 && err?.data?.message) {
                toast.error(err.data.message);
            } else {
                toast.error("Something went wrong");
            }
            console.error(err);
        }
    };

    return (<section className="grid grid-cols-12  lg:min-h-screen md:h-screen h-screen dark:bg-gray-800 bg-gray-50">

        {/* Left side  */}
        <div
            className='
                    pt-16
                    col-span-12 
                    md:col-span-4 
                    px-3 
                    

                    h-full 
                    max-sm:pb-7'
        >
            <div className='flex flex-col gap-5 items-center md:max-w-65 mx-auto pb-5 pt-13'>
                <img src="../../public/images/whitelogo.png" className="w-30 max-w-30 mix-blend-difference" />
                <h2 className='text-[1.06rem] text-gray-900 dark:text-gray-50 font-semibold'>Register Your Account</h2>
                 <Link to='/login' className='text-gray-600 dark:text-gray-50 bg-transparent ring py-1 px-3 rounded-full ring-junglegreen-bright flex items-center gap-1'>Demo login<MoveRight size={15} /> </Link>
            </div>
            <form
                onSubmit={handleSubmit}
                className='
                        flex flex-col
                        max-w-72 
                        md:max-w-100 mx-auto sm:max-w-[60%]'>
                <div className='flex flex-col gap-y-5 pb-6 pt-5'>

                    {signup.map((item, i) => (<div key={i}>
                        <Input

                            type={item.type}
                            icon={item.icon}
                            alt={item.alt}
                            placeholder={item.placeholder}
                            name={item.name}
                            value={formData[item.name]}
                            onChange={handleChange}
                        />
                        {errors[item.name] && (<p className="text-red-500 text-[0.75rem] mt-1 ml-2">
                            {errors[item.name]}
                        </p>)}
                    </div>))}


                </div>
                <label className='gap-2 inline-flex'>
                    <input type="checkbox" name="checkbox" className='bg-teal-bright' onClick={() => {
                        setTerms(!terms)
                    }} />
                    <p className='text-sm text-gray-600 dark:text-white'>
                        Accept our
                        <Link to='/' className='text-teal-bright'> Terms & Conditions</Link>
                    </p>
                </label>


                {
                    terms ? (<Button

                        style="
                            py-2
                            px-25
                            mt-7
                            bg-teal-bright
                            ease-linear
                            duration-100
                            hover:bg-teal-darken text-[0.8rem] sm:text-sm "
                    > {isLoading ? "Loading..." : "Sign up"} </Button>) :
                        (<p className=" py-2 flex items-center justify-center text-white font-bold
                            px-25
                            mt-7
                            bg-gray-400
                            ease-linear
                            duration-100
                            rounded-2xl
                            hover:bg-gray-400 text-[0.8rem] sm:text-sm">Sign up</p>)
                }
               

            </form>
            {/* Have an account  */}
            <Link
                to='/login'
                className='
                        text-sm 
                        text-gray-400
                        hover:text-teal-bright 
                        text-center 
                        block 
                        mt-14'
            >have an account ? Login</Link>
        </div>


        {/* Right side  */}
        <div className="col-span-8 p-5 hidden md:block  dark:bg-junglegreen-darken">
            <div className='flex justify-end gap-7 items-center'>


                <p className='text-[13px] text-gray-600 dark:text-gray-100'>Already have an account?</p>
                <Button
                    style="px-6
                            py-[5px] 
                            text-[13px]
                            ease-linear
                            duration-100 
                            bg-rose-bright 
                            hover:bg-rose-darken"
                    href="/login"
                >
                    Login
                </Button>
                <DarkTheme className={'cursor-p'} />
            </div>
            <div className='flex-center flex-col gap-5 pt-20'>
                <h1
                    className='text-[#000000a4] dark:text-gray-100 text-3xl font-semibold'>
                    Start managing
                    <span className='text-rose-bright px-1'>free</span>
                    now !
                </h1>
                <p className='h-[3rem] text-[0.96rem] text-center text-gray-600 dark:text-gray-100 font-display-swap max-w-[25rem]'>
                    SMS is a 100% free online
                    <TextAnimation
                        text_one="School"
                        text_two="College"
                        text_three="Institute"
                        text_four="Academy"
                        text_five="Tution Center"
                        text_six="Training Center"
                    /> <span> management software for a lifetime with no limitations.</span></p>
                <img
                    className="h-full w-full  max-w-[80rem] object-contain   "
                    src='images/signup1.webp'

                    alt="Professior"
                    loading="lazy"
                />
            </div>
        </div>

    </section>);
};

export default SignupForm;