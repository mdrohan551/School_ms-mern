import React from 'react';
import {MdOutlineSubdirectoryArrowRight} from "react-icons/md";

const EmpDetailsSidebar = ({empDetails}) => {
    const details = empDetails?.data ?? null;

    const onlineStatus = details.status;

    if (!details) {
        return <h1 className="text-center text-red-600">User details not available.</h1>;
    }



    const DetailsEmp = [
        { name: "Username", value: details.userName },
        { name: "password", value: details.password },
        { name: "Role", value: details.role },
        { name: "Phone", value: details.phone },
        { name: "Email", value: details.email },
        { name: "Gender", value: details.gender },
        { name: "Date of Birth", value: new Date(details.dateOfBirth).toLocaleDateString() || "N/A" },
        { name: "Date of Joining", value: new Date(details.dateOfJoining).toDateString() || "N/A" },
        { name: "Religion", value: details.religion || "N/A" },
        { name: "Blood Group", value: details.bloodGroup || "N/A" },
        { name: "National ID", value: details.nationalID || "N/A" },
        { name: "Address", value: details.address || "N/A" },
        { name: "Education", value: details.education || "N/A" },
        { name: "Experience", value: details.experience || "N/A" },
        { name: "Salary", value: details.salary || "N/A" },
        { name: "Status", value: details.status },
        { name: "School ID", value: details.schoolID },
        { name: "Updated employee Details", value: new Date(details.updatedAt).toLocaleDateString() }
    ];


    return (<div className=" flex flex-col gap-3  py-5 px-2">

        <div className="headerCard  dark:ring-purple-500 dark:ring-[0.8px] rounded-xl shadow-lg py-4">
            <div className="flex  ml-4 sm:gap-1 mb-4 relative">
                    <span
                        className="text-gray-400 dark:text-gray-200 ml-1 text-[0.8rem] p-1 ">{onlineStatus ? "online" : "ofline"}</span>
            </div>
            <div className="flex justify-center flex-col items-center">
                {/* Outer ring */}
                <div className="w-35 h-35 relative rounded-full bg-gray-100 flex items-center justify-center">
                    {/* Inner red circle */}
                    <div className="w-30   h-30 rounded-full  flex items-center justify-center overflow-hidden">
                        <img
                            className="w-full  h-full object-cover"
                            src={details.image || '/images/no-image.png'}
                            alt="userImage"
                        />
                    </div>
                    <span
                        className="absolute right-5 bottom-1 bg-gray-100 flex items-center justify-center overflow-hidden p-1 rounded-full ">
                        <span
                            className={`inline-flex size-5 rounded-full ${onlineStatus ? "bg-green-500" : "bg-gray-300"}`}></span>
                    </span>
                </div>

                <h2 className="text-xl font-semibold mt-4">{details.name}</h2>
                <p className="text-gray-400 text-[0.8rem]">{details.role}</p>
            </div>

        </div>
        <div className="headerCard  dark:ring-purple-500 dark:ring-[0.8px] rounded-xl shadow-lg py-4 px-4 ">
            <ul>
                {
                    DetailsEmp.map((item, index) => (
                        <li key={index}>
                            <p className="relative text-gray-500 dark:text-gray-300 text-[0.7rem] pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-25 after:h-[1px] after:bg-gray-400">
                                {item.name}
                            </p>
                            <div className="flex">
                                <MdOutlineSubdirectoryArrowRight/>
                                <p className='text-[0.7rem] font-bold'>{item.value}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>


        </div>
    </div>);
};

export default EmpDetailsSidebar;

