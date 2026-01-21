import React, {useState} from 'react';
import {
    BloodGroupdata, data1, data2, data3, Genderdata, Religiondata1
} from "../../../../../constant/EmployformData.js";
import {TfiReload} from "react-icons/tfi";
import {Check, Eye, EyeOff, LockKeyhole} from "lucide-react";
import UploadImg from "../../../UploadImg.jsx";
import DynamicInput from "../../../DynamicInput.jsx";

const Employform = ({
                        HandleChangeFrom,
                        formData,
                        HandleSubmit,
                        HandleResetChange,
                        previewUrl,
                        setPreviewUrl,
                        setLogoFile,
                        Errors,
                        isLoading,
                        submitText
                    }) => {
const [showPass,setShowPass]=useState(false);


    return (<div className="mt-8">

        <div className="flex justify-center mt-5">
            <div
                className="flex justify-center w-24 h-24 rounded-full ring-purple-600 relative ring-2 group transition-all duration-500 ease-linear   ">
                <img
                    src={previewUrl ? previewUrl : formData?.image ? formData.image : "/images/no-logo.png"}
                    alt="Logo"
                    className="w-24 h-24 object-cover rounded-full"
                />

                <UploadImg
                    name="logoImage"
                    id="logo-upload"
                    classinput="hidden"
                    classlabel=" hidden group-hover:flex absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 w-24 h-24  dark:bg-gray-800/50 bg-white/50 flex justify-center items-center rounded-full cursor-pointer "

                    setLogoFile={setLogoFile}
                    setPreviewUrl={setPreviewUrl}
                />
            </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {data1.map((item, index) => (
                <div key={index} className="relative border border-purpleColor rounded-3xl p-2">
                    <input
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        required={item.required}
                        onChange={HandleChangeFrom}
                        value={
                            item.type === "date"
                                ? formData[item.name]
                                    ? new Date(formData[item.name]).toISOString().split("T")[0]
                                    : new Date().toISOString().split("T")[0]
                                : formData[item.name] !== undefined
                                    ? formData[item.name]
                                    : ""
                        }
                        className="w-full relative z-1 rounded-2xl shadow dark:placeholder:text-gray-500 px-3 py-1 focus:outline-none border-none"
                    />


                    {item.type === "date" && (
                        <div className="absolute -right-[0.1rem] top-1/2 -translate-1/2 z-0 w-8 h-8 rounded-full dark:bg-gray-400"></div>
                    )}

                    {Errors[item.name] ? (
                        <div className="absolute -top-3 left-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {Errors[item.name]}
                        </div>
                    ) : (
                        <div className={`absolute -top-3 left-4 ${item.labelClass} text-white text-xs px-2 py-0.5 rounded-full`}>
                            {item.label}
                        </div>
                    )}
                </div>
            ))}


            <div className="relative border border-purpleColor rounded-3xl p-2">
                <select
                    name='role'
                    onChange={HandleChangeFrom}
                    value={formData.role}
                    className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 dark:bg-gray-950 ">
                    <option value="">Select*</option>
                    {data3.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                </select>

                {Errors.role ? (<div
                    className="absolute -top-3 left-4 bg-gradient-to-r bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {Errors.role}
                </div>) : (<div
                        className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Employee Role*
                    </div>)}

            </div>
        </div>
        <div className="flex items-center space-x-2 mt-10">
            <span className="bg-black px-3 py-1 rounded-full text-white">2</span>
            <h1 className="text-xl font-semibold"> Other Information</h1>
        </div>
        <hr/>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {data2.map((item, index) => (
                <div key={index} className="relative border border-purpleColor rounded-3xl p-2">
                    <input
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        onChange={HandleChangeFrom}
                        value={
                            item.type === "date"
                                ? formData[item.name]
                                    ? new Date(formData[item.name]).toISOString().split("T")[0]
                                    : ""
                                : formData[item.name] !== undefined
                                    ? formData[item.name]
                                    : ""
                        }

                        className="w-full relative z-1 rounded-2xl shadow bg-white dark:bg-transparent dark:placeholder:text-gray-400 px-3 py-1 focus:outline-none border-none"/>
                    {item.type === "date" ? <div
                        className="absolute -right-[0.1rem] top-1/2 -translate-1/2 z-0 w-8 h-8 rounded-full dark:bg-gray-400"></div> : ""

                    }

                    {/* ✅ Error message now appears below the input cleanly */}


                    {Errors[item.name] ? (<div
                        className="absolute -top-3 left-4 bg-gradient-to-r bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {Errors[item.name]}
                    </div>) : (<div
                            className={`absolute -top-3 left-4 ${item.labelClass} text-white text-xs px-2 py-0.5 rounded-full`}>
                            {item.label}
                        </div>)}
                </div>))}
            <div className="relative border border-purpleColor rounded-3xl p-2">
                <select
                    name='bloodGroup'
                    onChange={HandleChangeFrom}
                    value={formData.bloodGroup}
                    className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 dark:bg-gray-950">
                    <option value="">Select</option>
                    {BloodGroupdata.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                </select>
                <div
                    className="absolute -top-3 left-4 bg-gray-400 text-white text-xs px-2 py-0.5 rounded-full">
                    Blood Group
                </div>
            </div>
            <div className="relative border border-purpleColor rounded-3xl p-2">
                <select
                    name='religion'
                    onChange={HandleChangeFrom}
                    value={formData.religion}
                    className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 dark:bg-gray-950">
                    <option value="">Select</option>
                    {Religiondata1.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                </select>
                <div
                    className="absolute -top-3 left-4 bg-gray-400 text-white text-xs px-2 py-0.5 rounded-full">
                    Religion*
                </div>
            </div>

            <div className="relative border border-purpleColor rounded-3xl p-2">
                <select
                    name='gender'
                    onChange={HandleChangeFrom}
                    value={formData.gender}
                    className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 dark:bg-gray-950">
                    <option value="">Select</option>
                    {Genderdata.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                </select>
                {Errors.gender ? (<div
                    className="absolute -top-3 left-4 bg-gradient-to-r bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {Errors.gender}
                </div>) : (<div
                        className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Gender*
                    </div>)}
            </div>
            {/*dynamic password update field show this input */}
            {formData?.password !== undefined && (
                <div className="relative mt-2">
                    <DynamicInput
                        inputStyle="w-[25px]"
                        type={showPass ? "text" : "password"}
                        icon={LockKeyhole}
                        alt="Password Icon"
                        placeholder="Choose Password *"
                        divStyle=""
                        name="password"
                        value={formData.password}
                        onChange={HandleChangeFrom}
                        autoComplete="current-password"
                    />
                    <div onClick={()=>(setShowPass(!showPass))}>
                        {showPass ? <EyeOff size={17} className='absolute right-5 top-3 '/> : <Eye size={17} className='absolute right-5 top-3 '/>}
                    </div>
                    {Errors.password ? (
                        <div className="absolute -top-3 left-4 bg-gradient-to-r bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {Errors.password}
                        </div>
                    ) : (
                        <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Update Password *
                        </div>
                    )}
                </div>
            )}
            {/*dynamic password update field show this input */}






        </div>
        <hr className="mt-10"/>
        <div className="flex items-center justify-center mt-8 mb-8 gap-4 sm:gap-6">
            <button
                onClick={HandleResetChange}
                className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">
                <TfiReload className="text-base anim-roted"/>
                <span>Reset</span>
            </button>
            <button
                onClick={HandleSubmit}
                className="bg-[#6A5ACD] text-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">
                {isLoading ? (<><TfiReload className="text-base animate-spin"/>
                    <span>proccessing</span></>) : (<>
                    <Check className="text-base"/>
                    <span>{submitText}</span>
                </>)}

            </button>
        </div>
    </div>);
};

export default Employform;