import React, { useEffect } from 'react';
import { TfiReload } from "react-icons/tfi";

import { Plus, Check, Calendar } from 'lucide-react';
import {
    BloodGroupdata, field1, field2, field4, Genderdata, Religiondata
} from "../../../../../constant/AddnewData.js";
import UploadImg from "../../../UploadImg.jsx";



const Admissionform = ({
    setLogoFile,
    previewUrl,
    setPreviewUrl,
    formData,
    HandleChange,
    HandleResetChange,
    HandleSubmit,
    validation,
    buttonType,
    isLoading,
    allClasses,
    allClassLoading
}) => {


    const classData = allClasses?.data ?? [];
    // fallback

    return (<div className="w-full max-w-7xl mx-auto px-2">

        <div className="mt-7 ">

            {/*Header Section*/}
            <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-center mb-2">Admission
                Form
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                    <span className="inline-block w-4 h-2 rounded-full bg-purpleColor"></span>
                    <p className="text-sm text-purpleColor font-medium">Required*</p>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                    <span className="text-sm text-gray-600 font-medium">Optional</span>
                </div>
            </div>
            <div className="flex justify-center ">
                <div
                    className="flex justify-center w-24 h-24 rounded-full ring-purple-600 relative ring-2 group transition-all duration-500 ease-linear   ">
                    <img
                        src={
                            previewUrl && previewUrl !== "null" && previewUrl.trim() !== ""
                                ? previewUrl
                                : formData?.image && formData.image !== "null" && formData.image.trim() !== ""
                                    ? formData.image
                                    : "/images/no-image.png"
                        }
                        alt="avatar"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/no-image.png";
                        }}
                        className="w-full h-full object-cover rounded-full"
                    />


                    <UploadImg
                        name="image"
                        id="logo-upload"
                        classinput="hidden"
                        classlabel=" hidden group-hover:flex absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 z-2 w-24 h-24  dark:bg-gray-800/50 bg-white/50 flex justify-center items-center rounded-full cursor-pointer "

                        setLogoFile={setLogoFile}
                        setPreviewUrl={setPreviewUrl}
                    />
                </div>
            </div>
            {/*Student Information*/}
            <div className="flex items-center space-x-2">
                <span className="bg-black px-3 py-1 rounded-full text-white">1</span>
                <h1 className="text-xl font-semibold">Student Information</h1>
            </div>
            <hr />

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                {field1.map((item, index) => (
                    <div key={index} className="relative border border-purpleColor rounded-3xl p-2">
                        {/* Input or Select */}
                        {item.type === 'select' ? (
                            <select
                                name={item.name}
                                onChange={HandleChange}
                                value={formData[item.name] || ''}
                                className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 bg-transparent dark:bg-gray-950"
                            >
                                <option value="">Select an option</option>
                                {classData.map((option) => (
                                    <option key={option._id} value={option._id}>
                                        {formData.className ? formData.className : option.name}
                                    </option>
                                ))}
                            </select>

                        ) : (
                            <input
                                name={item.name}
                                type={item.type}
                                onChange={HandleChange}
                                placeholder={item.placeholder || item.label}
                                value={
                                    item.type === 'date'
                                        ? formData[item.name]
                                            ? new Date(formData[item.name]).toISOString().split('T')[0]
                                            : new Date().toISOString().split('T')[0]
                                        : formData[item.name] !== undefined
                                            ? formData[item.name]
                                            : ''
                                }
                                className="appearance-show w-full z-1 relative rounded-2xl shadow dark:text-gray-300 px-3 py-1 focus:outline-none border-none dark:placeholder-gray-400"
                            />
                        )}

                        {/* Calendar Icon (Only for Date Type) */}
                        {item.type === "date" ? <div
                            className="absolute -right-[0.1rem] top-1/2 -translate-1/2 z-0 w-8 h-8 rounded-full bg-gray-400"></div> : ""}


                        {/* Label or Validation */}
                        {validation[item.name] ? (
                            <div
                                className="absolute -top-3 left-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {validation[item.name]}
                            </div>
                        ) : (
                            <div
                                className={`absolute -top-3 left-4 ${item.labelClass} text-white text-xs px-2 py-0.5 rounded-full`}
                            >
                                {item.label}
                            </div>
                        )}
                    </div>
                ))}


            </div>


            {/*Other Information*/}
            <div className="flex items-center space-x-2 mt-15">
                <span className="bg-black px-3 py-1 rounded-full text-white">2</span>
                <h1 className="text-xl font-semibold">Other Information</h1>
            </div>
            <hr />

            <div className="w-full  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

                {field4.map((item, index) => (
                    <div key={index} className="relative border border-purpleColor rounded-3xl p-2">
                        <input
                            onChange={HandleChange}

                            name={item?.name}
                            type={item.type}
                            placeholder={item.placeholder || item.label}
                            value={item.type === "date" ? formData[item.name] ? new Date(formData[item.name]).toISOString().split("T")[0] : "" : formData[item.name] !== undefined ? formData[item.name] : ""


                            }


                            className="w-full relative z-1 rounded-2xl shadow  dark:bg-transparent dark:text-gray-200 dark:placeholder:text-gray-500 px-3 py-1 focus:outline-none border-none" />
                        {item.type === "date" ? <div
                            className="absolute -right-[0.1rem] top-1/2 -translate-1/2 z-0 w-8 h-8 rounded-full bg-gray-400"></div> : ""

                        }
                        {validation[item.name] ? (<div
                            className="absolute -top-3 left-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {validation[item.name]}
                        </div>) : (<div
                            className={`absolute -top-3 left-4 ${item.labelClass} text-white text-xs px-2 py-0.5 rounded-full`}>
                            {item.label}
                        </div>)}
                    </div>))}


            </div>
            <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>


                <div className="relative border border-purpleColor rounded-3xl p-2">
                    <select
                        onChange={HandleChange}

                        name='gender'
                        value={formData.gender}
                        className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 bg-transparent dark:bg-gray-950">
                        <option value="">Gender *</option>
                        {Genderdata.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                    </select>


                    {validation.gender ? (<div
                        className="absolute -top-3 left-4 bg-gradient-to-r bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {validation.gender}
                    </div>) : (<div
                        className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Gender*
                    </div>)}
                </div>


                <div className="relative border border-purpleColor rounded-3xl p-2">
                    <select
                        onChange={HandleChange}

                        name='religion'
                        value={formData.religion}
                        className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 bg-transparent dark:bg-gray-950">
                        <option value="">Religion</option>
                        {Religiondata.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                    </select>


                    {validation.gender ? (<div
                        className="absolute -top-3 left-4 bg-gradient-to-r bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {validation.gender}
                    </div>) : (<div
                        className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Religion*
                    </div>)}
                </div>

                <div className="relative border border-purpleColor rounded-3xl p-2 col-span-2">
                    <select
                        onChange={HandleChange}

                        name='bloodGroup'
                        value={formData.bloodGroup}
                        className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 bg-transparent dark:bg-gray-950">
                        <option value="">Blood Group</option>
                        {BloodGroupdata.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                    </select>
                    <div
                        className="absolute -top-3 left-4 bg-gray-400 text-white text-xs px-2 py-0.5 rounded-full ">
                        Blood Group*
                    </div>
                </div>

            </div>

            {/*Father Information*/}

            <div className="flex items-center space-x-2 mt-15">
                <span className="bg-black px-3 py-1 rounded-full text-white">3</span>
                <h1 className="text-xl font-semibold"> Father/Guardien Information</h1>
            </div>

            <hr />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {field2.map((item, index) => (
                    <div key={index} className="relative border border-purpleColor rounded-3xl p-2">
                        <input
                            onChange={HandleChange}

                            name={item?.name}
                            type={item.type}
                            value={formData[item.name]}
                            placeholder={item.placeholder}
                            className="w-full rounded-2xl shadow dark:placeholder:text-gray-300 px-3 py-1 focus:outline-none border-none" />
                        <div
                            className={`absolute -top-3 left-4 ${item.labelClass} text-white text-xs px-2 py-0.5 rounded-full`}>
                            {item.label}
                        </div>
                    </div>))}
            </div>


            {/*Button Section*/}

            <div className="flex sm:flex-row items-center justify-center mt-8 mb-8 gap-4 sm:gap-6">
                <button
                    onClick={HandleResetChange}
                    className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">
                    <TfiReload className="text-base" />
                    <span>Reset</span>
                </button>

                <button
                    onClick={HandleSubmit}
                    disabled={isLoading}
                    className={`bg-[#6A5ACD] ${isLoading?"disabled:not-invalid:" : ""} text-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}>
                    {isLoading ? (<>
                        <TfiReload className="text-base animate-spin" />
                        <span>processing...</span>
                    </>) : (<>
                        <Check className="text-base" />
                        <span>{buttonType}</span>
                    </>)}
                </button>

            </div>
        </div>
    </div>);
};

export default Admissionform;
