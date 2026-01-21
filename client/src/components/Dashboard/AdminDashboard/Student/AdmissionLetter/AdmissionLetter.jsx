import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { FaPrint } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { useGetAllStudentsQuery } from '../../../../../redux/Features/StudentCreateAdmin/StudentCreateAdmin';
import { Link } from 'react-router-dom';

const StudentCard = ({ student }) => {
    const imageUrl = (student.image && student.image !== 'null')
        ? student.image
        : '/images/no-image.png';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-transform duration-300 transform hover:scale-105 print:hidden">
            <img
                src={imageUrl}
                alt={student.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-400"
            />
            <div className="flex flex-col items-center justify-content-around gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{student.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reg. No: {student.registrationNumber}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Class ID: {student.classID}</p>
                <Link
                    className="text-bold flex gap-2 items-center bg-blue-500 text-white text-sm rounded-xl px-2 py-2"
                    to={`/dashboard/singleStudent/${student._id}`}
                >
                    <FaPrint size={15} color="white" /> Print Student Letter
                </Link>
            </div>
        </div>
    );
};

const AdmissionLetter = () => {
    const { data: studentData = [], isLoading, error, refetch } = useGetAllStudentsQuery();
    const students = studentData.data || [];

    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registrationNumber.toString().includes(searchTerm)
    );

    const suggestions = students.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.registrationNumber.toString().includes(search)
    ).slice(0, 5);

    if (isLoading) return <p className="text-center text-xl mt-10 print:hidden">Loading student data...</p>;
    if (error) return <p className="text-center text-red-500 mt-10 print:hidden">Something went wrong.</p>;

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen print:bg-white print:p-0 print:m-0 print:min-h-screen print:max-w-none">
            {/* Search and Refresh */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8 relative print:hidden">
                <div className="w-full sm:w-1/3 relative">
                    <input
                        type="text"
                        placeholder="Name or Registration Number"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {search && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full sm:w-1/3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mt-1 rounded-md max-h-40 overflow-y-auto top-full left-1/2 -translate-x-1/2 print:hidden">
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

                <button
                    onClick={() => setSearchTerm(search)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors print:hidden"
                >
                    Search
                </button>

                <button
                    onClick={() => {
                        setSearch("");
                        setSearchTerm("");
                        refetch();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors print:hidden"
                    title="Refresh List"
                >
                    <TfiReload />
                    <span>Refresh</span>
                </button>
            </div>

            {/* Students Grid */}
            {filteredStudents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 print:grid-cols-1 print:p-0 print:m-0 print:max-w-none">
                    {filteredStudents.map(student => (
                        <StudentCard key={student._id} student={student} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500 dark:text-gray-400 mt-10 print:hidden">No student found.</p>
            )}
        </div>
    );
};

export default AdmissionLetter;
