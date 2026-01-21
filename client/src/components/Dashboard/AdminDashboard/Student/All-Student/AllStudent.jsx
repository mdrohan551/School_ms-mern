import React, { useEffect, useState } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import StudentCard from "./StudenCard.jsx";
import {
    useDeleteStudentMutation,
    useGetAllStudentsQuery
} from "../../../../../redux/Features/StudentCreateAdmin/StudentCreateAdmin.js";
import { toast } from "react-hot-toast";
import DataEmpty from "../../../../dataNotFound/DataEmpty.jsx";
import { useSingleClassQuery } from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";
import { Link, useLocation } from "react-router-dom";
import StudentCardLoader from "../StudentCardLoader.jsx";
import { TfiReload } from "react-icons/tfi"; // ✅ Refresh Icon

const AllStudent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const classID = queryParams.get("class_id");
    const classNM = queryParams.get("class_name");

    const { data: studentData = [], isLoading, error, refetch } = useGetAllStudentsQuery();
    const { data: singeClass = {}, isLoading: singClassLoading } = useSingleClassQuery(classID, {
        skip: !classID,
    });

    const [DeleteStudent] = useDeleteStudentMutation();
    const students = classID ? (singeClass?.data?.students || []) : (studentData?.data || []);
    const [visible, setVisible] = useState(16);
    const LoadMore = () => setVisible(prev => prev + 8);

    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        refetch();
        if (error) toast.error("Something went wrong!");
    }, [error, refetch]);

    const suggestions = students.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.registrationNumber.toString().includes(search)
    ).slice(0, 5);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registrationNumber.toString().includes(searchTerm)
    );

    if (singClassLoading) return <p>Loading...</p>;

    return (
        <div>
            {/* Header */}
            <div className="max-w-full mx-auto shadow-lg rounded-xl p-4 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-4 lg:space-y-0 lg:space-x-6 mt-4 bg-white dark:bg-gray-800">

                <Link className="shadow-md ring-1 ring-gray-300 dark:ring-purple-500 rounded-xl" to={`/dashboard/admission`}>
                    <button className="font-medium py-2 px-6 flex items-center gap-3 text-base text-gray-800 dark:text-gray-100">
                        <span className="text-2xl sm:text-3xl">+</span> Add New
                    </button>
                </Link>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">Students</h1>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
                        <IoHomeOutline className="text-xl" />
                        <p className="text-sm sm:text-base">- All Students</p>
                    </div>
                </div>

                {/* Search and Refresh */}
                <div className="w-full lg:w-1/3 relative">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search by name or reg. number"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 rounded-md border placeholder:text-gray-400 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none"
                        />
                        <button
                            onClick={() => setSearchTerm(search)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Search
                        </button>

                        {/* ✅ Refresh Button */}
                        <button
                            onClick={() => {
                                setSearch("");
                                setSearchTerm("");
                                refetch();
                                toast.success("Refreshed!");
                            }}
                            className="px-4 py-2 bg-blue-400 text-white rounded-md flex items-center justify-center"
                            title="Refresh"
                        >
                            <TfiReload className="text-xl" />
                        </button>
                    </div>

                    {search && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mt-1 rounded-md max-h-40 overflow-y-auto">
                            {suggestions.map((student) => (
                                <li
                                    key={student._id}
                                    onClick={() => {
                                        setSearch(student.name);
                                        setSearchTerm(student.name);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm"
                                >
                                    {student.name} ({student.registrationNumber})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Student Cards */}
            {classID && singeClass?.data?.students?.length === 0 ? (
                <p className="text-black dark:text-gray-50 text-xl font-light flex flex-col justify-center items-center w-full h-100">
                    <span className="flex">
                        This (<h1 className="text-blue-400 dark:text-blue-500 font-bold capitalize ml-1">{classNM}</h1>) class does not have any students.
                    </span>
                    <Link className="text-sm underline hover:no-underline mt-5" to={"/dashboard/admission"}>
                        {`<`} create student
                    </Link>
                </p>
            ) : filteredStudents.length === 0 ? (
                <DataEmpty text="Students" />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mt-8 mx-4">
                    {isLoading === true ? (
                        Array.from({ length: 16 }).map((_, index) => (
                            <StudentCardLoader key={index} />
                        ))
                    ) : (
                        filteredStudents.slice(0, visible).map((student, index) => (
                            <StudentCard
                                key={student._id || index}
                                refetch={refetch}
                                student={student}
                                DeleteStudent={DeleteStudent}
                            />
                        ))
                    )}
                </div>
            )}

            {/* Load More Button */}
            <div className="flex justify-center">
                {visible < filteredStudents.length && (
                    <button
                        onClick={LoadMore}
                        className="cursor-pointer ring animate-pulse w-50 rounded-xl text-center mt-8 mb-8 py-3 font-bold capitalize"
                    >
                        <span>click me...</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default AllStudent;
