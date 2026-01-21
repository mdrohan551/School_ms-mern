import React, { useState, useEffect } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import {
    useAllClassesQuery,
    useDeleteClassMutation
} from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";
import { TfiReload } from "react-icons/tfi";
import toast from "react-hot-toast";

import ClassCard from "./ClassCard.jsx";
import { DeleteAlert } from "../../../../Swal.js";
import DataEmpty from "../../../../dataNotFound/DataEmpty.jsx";
import Pagination from "../../../Pagination.jsx";
import { Link } from "react-router-dom";

const Allclasses = () => {
    const [DeleteClass] = useDeleteClassMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalstable] = useState(5);

    const { data, isLoading, refetch } = useAllClassesQuery({ page: currentPage, count: totalstable });

    const { data: allClasses = [], meta = {} } = data || {};
    const {
        total = 0,
        totalPages = 0,
        page = 1,
        topClassID = null,
        secondClassID = null,
        thirdClassID = null
    } = meta;

    useEffect(() => {
        // If user changes page, remove previous toast
        toast.dismiss();
        refetch()
    }, [currentPage]);

    if (isLoading) {
        return (
            <div className='flex items-center justify-center w-full min-h-screen'>
                <h1 className="flex gap-2 items-center text-lg md:text-xl animate-pulse">
                    <TfiReload className="text-xl md:text-2xl animate-spin" /> Loading data...
                </h1>
            </div>
        );
    }

    const startStudent = allClasses.length > 0 ? (currentPage - 1) * totalstable + 1 : 0;
    const endStudent = allClasses.length > 0 ? startStudent + allClasses.length - 1 : 0;

    const HandleDelte = async (id) => {
        const isConfirmed = await DeleteAlert();
        if (isConfirmed) {
            try {
                let res = await DeleteClass(id).unwrap();
                if (res.status === true) {
                    toast.success(res?.message);
                    refetch();
                }
            } catch (err) {
                const message = err?.data?.message || err?.error || "Something went wrong!";
                toast.error(message);
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div
                className="max-w-full mx-auto shadow-lg rounded-xl p-4 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-4 lg:space-y-0 lg:space-x-6 mt-4 bg-white dark:bg-gray-800">

                <Link
                    className="shadow-md ring-1 ring-gray-300 dark:ring-purple-500 rounded-xl "
                    to={`/dashboard/addnewclass`}>
                    <button className="font-medium py-2 px-6 flex items-center gap-3 text-base text-gray-800 dark:text-gray-100">
                        <span className="text-2xl sm:text-3xl">+</span> Add New
                    </button>
                </Link>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">Classes</h1>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
                        <IoHomeOutline className="text-xl" />
                        <p className="text-sm sm:text-base">- All Classes</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                </div>
            </div>

            <div className="mt-6">
                <div className="px-2 mb-4 text-gray-700 dark:text-gray-300">
                    <div className="font-light text-sm sm:text-base">
                        Showing {startStudent} to {endStudent} of {total} students
                    </div>
                </div>

                {allClasses.length === 0 ? (
                    <DataEmpty text={'Classes'} />
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-lg shadow-md">
                            <table
                                className="w-full px-5 min-w-[700px] border-separate border-spacing-y-3 text-sm text-left text-gray-600 dark:text-gray-400">
                                <thead
                                    className="hidden sm:table-header-group text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-3 sm:px-6">Class</th>
                                    <th className="px-4 py-3 sm:px-6 text-center">Students</th>
                                    <th className="px-4 py-3 sm:px-6 text-center">Progress</th>
                                    <th className="px-4 py-3 sm:px-6 text-center">Details</th>
                                    <th className="px-4 py-3 sm:px-6 text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {allClasses.map((item) => {
                                    const hasStudents = item.totalStudent > 0;
                                    const isWinner = page === 1 && hasStudents && item._id === topClassID;
                                    const isSecond = page === 1 && hasStudents && item._id === secondClassID;
                                    const isThird = page === 1 && hasStudents && item._id === thirdClassID;

                                    return (
                                        <ClassCard
                                            key={item._id}
                                            subjectName={item?.name}
                                            totalCount={item?.totalStudent}
                                            id={item?._id}
                                            HandleDelte={HandleDelte}
                                            isWinner={isWinner}
                                            isSecond={isSecond}
                                            isThird={isThird}
                                        />
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>

                        <div className=" flex justify-around">
                            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Allclasses;
