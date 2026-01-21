import React, {useState} from 'react';
import { IoCheckmark } from "react-icons/io5";
import {dataFields} from "../../../../../constant/FeesparticularData.js";


const Form = () => {

    const [selectedOption, setSelectedOption] = useState("");

    return (
        <div className="ml-5">

            {/* Top Section */}
            <h1 className="text-3xl font-medium text-gray-700 flex items-center justify-center mt-7">
                Change Fee Particulars
            </h1>
            <div className="flex items-center justify-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                    <span
                        className="inline-block w-4 h-2 rounded-full bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9]"></span>
                    <p className="text-sm text-purpleColor ">Required*</p>
                </div>

                <div className="flex items-center space-x-1">
                    <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                    <span className="text-sm text-gray-600">Fixed</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 max-w-7xl mx-auto mr-1">
                {/* Dropdown */}
                <div className="relative border border-purpleColor rounded-3xl p-2 w-full">
                    <select
                        className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none pr-8"
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="">All Student</option>
                        <option value="Specific Class">Specific Class</option>
                        <option value="Specific Student">Specific Student</option>
                    </select>
                    <div
                        className="absolute -top-3 left-4 bg-gradient-to-r from-[#F5515F] to-[#F9A825] text-white text-xs px-2 py-0.5 rounded-full">
                        Fee Particulars for*
                    </div>
                </div>

                {/* Conditional Input */}
                {selectedOption === "Specific Student" && (
                    <div className="relative border border-purpleColor rounded-3xl p-2 w-1/2">
                        <input
                            type="text"
                            placeholder="Search Student..."
                            className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none placeholder:font-semibold"
                        />
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#F5515F] to-[#F9A825] text-white text-xs px-2 py-0.5 rounded-full">
                            Search Student*
                        </div>
                    </div>
                )}
            </div>


            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-1 sm:gap-6 mt-8 max-w-7xl mx-auto mr-1 ">

                {/* Left Side */}
                <div className="space-y-6">
                    {/*  Inputs loop Written */}
                    {
                        dataFields.map((item, index) => (
                            <div key={index} className="relative border border-purpleColor rounded-3xl p-2 bg-gray-100">
                                <input type="text" placeholder={item.label} readOnly={item.readOnly || false}
                                       className={`w-full  rounded-2xl shadow px-3 py-1 focus:outline-none border-none  placeholder:font-medium ${item.readOnly ? "cursor-not-allowed " : "bg-white"}`}/>
                                <div
                                    className={`absolute -top-3 left-4 text-white text-xs px-2 py-0.5 rounded-full ${
                                        item.tagBg || "bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9]"
                                    }`}
                                >Particular
                                    Label*
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Right Side */}
                <div className="space-y-6 w-1/1 sm:w-1/2 lg:w-1/2">

                    {/*  Inputs Manually Written */}
                    <div className="relative border border-purpleColor rounded-3xl p-2 bg-gray-100">
                        <input type="text" placeholder="[FIXED]" readOnly
                               className="w-full  rounded-2xl shadow px-3 py-1 focus:outline-none border-none cursor-not-allowed bg-gray-100 placeholder:font-medium"/>
                        <div
                            className="absolute -top-3 left-4 text-white text-xs px-2 py-0.5 rounded-full bg-gray-400">Prefix
                            Amount*
                        </div>
                    </div>

                    {/*  Inputs loop Written */}

                    {Array.from({length: 8}, (_, idx) => (
                        <div key={idx} className="relative border border-purpleColor rounded-3xl p-2">
                            <input type="number" placeholder="0"
                                   className="w-full  rounded-2xl shadow px-3 py-1 focus:outline-none border-none"/>
                            <div
                                className="absolute -top-3 left-4 text-white text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9]">Prefix
                                Amount*
                            </div>
                        </div>
                    ))}

                    {Array.from({length: 2}, (_, index) => (
                        <div key={index} className="relative border border-purpleColor rounded-3xl p-2 bg-gray-100">
                            <input type="text" placeholder="[FIXED]" readOnly
                                   className="w-full  rounded-2xl shadow px-3 py-1 focus:outline-none border-none cursor-not-allowed bg-gray-100 placeholder:font-medium"/>
                            <div
                                className="absolute -top-3 left-4 text-white text-xs px-2 py-0.5 rounded-full bg-gray-400">Prefix
                                Amount*
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Button */}

            <div className="flex items-center justify-center mt-8 mb-25">
                <button
                    className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">
                    <IoCheckmark className="text-xl"/>
                    <span>Update Profile</span>
                </button>
            </div>
        </div>
    );
};

export default Form;
