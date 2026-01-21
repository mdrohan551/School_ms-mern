import React, {useEffect, useState} from 'react';

import {TfiReload} from "react-icons/tfi";
import {leftInputs, rightInputs} from "../../../../../constant/instituteProfileData.js";
import UploadImg from "../../../UploadImg.jsx";


const Profile = ({
                     FormChangeHandler,
                     HandleSubmit,
                     setFormData,
                     formData,
                     setLogoFile,
                     isUpdating,
                     setPreviewUrl,
                     previewUrl,
                     data,
                     errorMessage
                 }) => {

    const [showMessage, setShowMessage] = useState(false);

    const handleLocationClick = () => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000); // 3 sec পর hide
    };
    let ImgLogo = data?.data?.[0]?.logoImage;
    useEffect(() => {
        if (data?.data?.[0]) {
            const apiData = data.data[0];
            setFormData((prev) => ({
                ...prev, ...apiData
            }));
        }
    }, [data]);


    return (
        <div className="  bg-white shadow p-5 rounded-xl dark:bg-gray-500/10 ">

            {/* Top Section */}
            <h1 className="text-sm sm:text-2xl font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center mb-3">Update
                Profile</h1>
            <div className="flex items-center justify-center space-x-4 mb-6">

                <div className="flex items-center space-x-1">
                    <span className="inline-block w-4 h-2 rounded-full bg-purpleColor"></span>
                    <p className="text-sm text-purpleColor font-medium">Required*</p>
                </div>


                <div className="flex items-center space-x-1">
                    <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Optional</span>
                </div>
            </div>
            <hr className=" text-gray-400  "/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 ">
                {/* Left Side */}

                <div className="space-y-6 ">
                    <div className="flex justify-center mb-12">
                        <div
                            className="flex justify-center w-24 h-24 rounded-full ring-purple-600 relative ring-2 group transition-all duration-500 ease-linear   ">
                            <img
                                src={previewUrl // ইউজার নতুন ইমেজ আপলোড করলে এটা থাকবে
                                    ? previewUrl : ImgLogo // API থেকে আসা লোগো
                                        ? ImgLogo : "/https://i.ibb.co/6JDHN4XP/no-logo.jpg" // কিছু না থাকলে ডিফল্ট ইমেজ
                                }
                                alt="Logo"
                                className="w-24 h-24 object-cover rounded-full  "
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
                    {/* Input Section */}
                    <div className="space-y-6">
                        {leftInputs.map((item, index) => (
                            <div key={index} className="relative  border border-purpleColor rounded-3xl p-2">
                                <input
                                    name={item.name}
                                    value={formData[item.name] || ""}
                                    onChange={FormChangeHandler}
                                    type="text"
                                    placeholder={item.placeholder}
                                    className="w-full text-sm rounded-2xl shadow px-3 py-1 focus:outline-none border-none placeholder:text-gray-350 dark:placeholder:text-gray-400"/>
                                <div
                                    className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                    {item.label}
                                </div>


                                {errorMessage[item.name] && (
                                    <p className="mt-1 right-10 -top-3 bg-blue-950 p-1 rounded-xl text-[0.7rem] text-red-600 animate-slide-bottom">
                                        {errorMessage[item.name]}
                                    </p>
                                )}
                            </div>))}
                        {/* ✅ Show specific error if exists */}

                    </div>

                </div>

                {/* Right Side */}
                <div className="space-y-6">

                    {rightInputs.map((item, index) => (
                        <div key={index} className="relative  border border-purpleColor rounded-3xl p-2">
                            <input
                                name={item.name}
                                value={formData[item.name] || ""}
                                onChange={FormChangeHandler}
                                type="text"
                                placeholder={item.placeholder}
                                className="w-full text-sm rounded-2xl shadow px-3 py-1 focus:outline-none border-none placeholder:text-gray-350 dark:placeholder:text-gray-400"/>
                            <div
                                className={`absolute -top-3 left-4 bg-gradient-to-r ${item.required ? "from-[#2D9CDB] to-[#BB6BD9] " : " bg-gray-400"} text-white text-xs px-2 py-0.5 rounded-full`}>
                                {item.label}
                            </div>

                            {errorMessage[item.name] && (
                                <p className="mt-1 right-10 -top-3 bg-gray-950 p-1 rounded-xl text-[0.7rem] text-red-600 animate-slide-bottom">
                                    {errorMessage[item.name]}
                                </p>
                            )}
                        </div>))}

                    {/* Country */}
                    <div className="relative border border-purpleColor rounded-3xl py-3 px-5 text-sm"
                         onClick={handleLocationClick}>
                        {formData.countresAndZila}

                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Dynamic location here *
                        </div>
                        {showMessage && (<div
                            className="absolute top-full left-0 mt-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow px-3 py-2 z-10">
                            We detected your location as: <strong>{formData.countresAndZila}</strong>
                        </div>)}
                    </div>

                </div>
            </div>

            {/* Button Section */}
            <div className="flex items-center justify-center mt-8">
                <button
                    onClick={HandleSubmit}
                    className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">


                    {isUpdating ? <>
                        <TfiReload className="text-base text-black animate-spin "/>
                        <span className="text-black text-[0.7rem]">proccessing...</span>
                    </> : <>      <TfiReload className="text-base text-black  "/>
                        <span className="text-black text-[0.7rem]">Update Profile</span>

                    </>}


                </button>
            </div>
        </div>);
};

export default Profile;