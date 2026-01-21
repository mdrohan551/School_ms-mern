import React, { useState } from 'react';
import { CiLock } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Eye, EyeOff } from 'lucide-react';

const FormView = () => {
    const [showPassword, setshowPassword] = useState(false);

    return (
        <div style={{
            backgroundImage: `url("/images/bg1.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
        }} className="w-full rounded-3xl p-4 sm:p-6 md:p-10">
            <div className="flex flex-col sm:flex-row items-center justify-center text-white text-2xl sm:text-3xl font-medium gap-2 sm:gap-3 pt-6 sm:pt-10 text-center">
                <CiLock />
                <h1>Account details</h1>
            </div>

            <hr className="mt-5 text-gray-400" />

            <div className="text-white pt-5  sm:ml-10 space-y-4 sm:space-y-2 text-sm sm:text-base">

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-6">
                    <h1>Username<span className="ml-1 sm:ml-4">:</span></h1>
                    <p>rezwanahmmedsiam45@gmail.com</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-6 relative">
                    <h1>Password<span className="ml-1 sm:ml-5">:</span></h1>
                    <p className="text-white">
                        {showPassword ? 'sadasdsad' : '•'.repeat(9)}
                    </p>
                    <div
                        onClick={() => setshowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-6 text-sm">
                    <h1>Subscription<span className="ml-1 sm:ml-3">:</span></h1>
                    <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#2CD9A1] to-[#00A9F4]">
                        <FaCheck />
                        <span>FREE</span>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-6">
                    <h1>Expiry<span className="ml-1 sm:ml-13">:</span></h1>
                    <p>Never</p>
                </div>
            </div>

            <hr className="mt-5 text-gray-400" />

            <div className="flex items-center justify-center text-white mt-6 ">
                <button className="bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] border border-transparent active:border-gray-400 px-4 py-2 text-lg sm:text-xl rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">
                    <RiDeleteBin6Line />
                    <span>Delete Account</span>
                </button>
            </div>
        </div>
    );
};

export default FormView;
