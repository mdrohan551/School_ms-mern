import React, {useEffect, useState} from 'react';

import {MdOutlineSubdirectoryArrowRight} from "react-icons/md";
import {MdOutlinePhoneIphone} from "react-icons/md";
import {TfiEmail} from "react-icons/tfi";
import {AiOutlineGlobal} from "react-icons/ai";
import {GrLocationPin} from "react-icons/gr";
import {LuFlagTriangleLeft} from "react-icons/lu";
import LoadingBar from "react-top-loading-bar";


const View = ({detailloading,data}) => {
const [details,setDetails] = useState({});
    const contactItems = [
        {
            icon: <MdOutlinePhoneIphone />,
            label: "Phone No",
            value: details.phone || '---  --- ---',
            hrWidth: "w-1/6"
        },
        {
            icon: <TfiEmail />,
            label: "Email",
            value: details.email || '--- ---',
            hrWidth: "w-1/9"
        },
        {
            icon: <AiOutlineGlobal />,
            label: "Website",
            value: details.website || ' -- -- --',
            hrWidth: "w-1/7"
        },
        {
            icon: <GrLocationPin />,
            label: "Address",
            value: details.address || ' ---- ----- ---- ',
            hrWidth: "w-1/7"
        },
        {
            icon: <LuFlagTriangleLeft />,
            label: "Country",
            value: details.countresAndZila || '**---***---***',
            hrWidth: "w-1/7"
        }
    ];



    useEffect(() => {
        (async () => {
            let res = await data;
            setDetails(res.data[0])
        })()
    }, [data])


 if (detailloading) return <LoadingBar/>
    return (
        <div className="mr-0 sm:mr-0 ">
            <div className="rounded-2xl dark:bg-gray-500/10  bg-white shadow-md p-5 max-w-2xl   ">
                <button
                    className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-[#2DE2A1] to-[#2DC8E2] cursor-pointer">Profile
                    View
                </button>

                <div className="flex items-center justify-center ">
                    <div className="relative w-36 h-36">
                        {/* Blur background color layer */}
                        <div className="absolute inset-0  bg-gray-400 dark:bg-purple-600/30 blur-[2rem] dark:blur-[3rem] rounded-full z-0"></div>

                        {/* Image */}
                        <div className="relative z-10 shadow-xl rounded-full overflow-hidden w-full h-full ring-1 ring-purple-600 ">
                            <img
                                src={details?.logoImage ? details?.logoImage : "/images/no-logo.png"}
                                alt="logo"
                                className="w-full h-full object-cover "
                            />
                        </div>
                    </div>

                </div>
                <h1 className="flex items-center justify-center sm:text-sm md:text-xl lg:text-3xl  font-bold uppercase dark:text-gray-300 text-gray-600 py-2">
                    {details?.instituteName || "Institute name"}
                </h1>

                <p className="flex items-center text-sm text-gray-600 dark:text-gray-400 justify-center mb-4">{details?.tagline || "tag name"}</p>

                <hr className="text-gray-400 "/>

                <div className="mt-4 space-y-2 text-gray-800 dark:text-gray-300 text-sm ml-6">
                    {
                        contactItems.map((item, index) => (
                            <div key={index}>
                                <div className="flex gap-1 items-center">
                                    <p className='text-sm'> {item.icon}</p>
                                    <p className="text-[0.9rem]">{item.label}</p>
                                </div>
                                <hr className="bg-gray-800 shadow-md w-1/6"/>
                                <div className="flex items-center">
                                    <MdOutlineSubdirectoryArrowRight/>
                                    {
                                        item.label === "Website" && details.website ? (
                                            <a
                                                href={
                                                    details.website.startsWith("http")
                                                        ? details.website
                                                        : `https://${details.website}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-600 hover:underline "
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="ml-1">{item.value}</p>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default View;