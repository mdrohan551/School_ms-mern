import React, { useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import Card from "./card.jsx";

import { useGetAllStudentsQuery } from "../../../../../redux/Features/StudentCreateAdmin/StudentCreateAdmin.js";
import {useAllClassesQuery} from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";

const ManageLogin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalStable] = useState(7);
    const { data = {}, isLoading } = useGetAllStudentsQuery({ page: currentPage, count: totalStable });
    const {data: allClasses} = useAllClassesQuery();
    const allStudent = data?.data || [];  // সরাসরি student array
    const {
        total = 0,
        totalPages = 1,
    } = data?.meta || {};
    const startStudent = data?.data?.length > 0 ? (currentPage - 1) * totalStable + 1 : 0;
    const endStudent = data?.data?.length > 0 ? startStudent +  data?.data?.length - 1 : 0;
    return (
        <div className="w-full px-4">
            <div className="w-full shadow rounded-xl p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between bg-gray-100/10 mt-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-xl font-medium">Students</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-xl" />
                        <p className="text-xl">- Students Login</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-9">
                {isLoading ? <h1>Loading...</h1> :

                    <Card
                        allStudent={allStudent}
                        allClasses={allClasses}
                        total={total}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        endStudent={endStudent}
                        startStudent={startStudent}
                    />

                }

            </div>
        </div>
    );
};

export default ManageLogin;
