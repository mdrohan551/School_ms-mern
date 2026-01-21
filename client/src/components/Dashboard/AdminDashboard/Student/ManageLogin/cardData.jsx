import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const CardData = ({ allStudent, allClasses }) => {
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const studentsWithClassName = allStudent.map((student) => {
        const matchedClass = allClasses?.data?.find((cls) => cls._id === student.classID);
        return {
            ...student,
            className: matchedClass ? matchedClass.name : 'Unknown Class',
        };
    });

    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full rounded-md shadow-md mt-7">
                <thead>
                <tr className="bg-gray-700 text-white text-left">
                    <th className="py-3 px-4" style={{ minWidth: '120px' }}>ID</th>
                    <th className="py-3 px-4" style={{ minWidth: '160px' }}>Student Name</th>
                    <th className="py-3 px-4" style={{ minWidth: '130px' }}>Class</th>
                    <th className="py-3 px-4" style={{ minWidth: '150px' }}>Username</th>
                    <th className="py-3 px-4" style={{ minWidth: '150px' }}>Password</th>
                </tr>
                </thead>
                <tbody>
                {studentsWithClassName && studentsWithClassName.length > 0 ? (
                    studentsWithClassName.map((student) => (
                        <tr
                            key={student._id}
                            className="text-gray-800 dark:text-gray-300 bg-white dark:bg-transparent border-b border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-400/20"
                        >
                            <td className="py-3 px-4 cursor-pointer">{student.registrationNumber}</td>
                            <td className="py-3 px-4 cursor-pointer">{student.name}</td>
                            <td className="py-3 px-4 cursor-pointer">{student.className || 'N/A'}</td>
                            <td className="py-3 px-4 cursor-pointer">{student.userName || 'N/A'}</td>
                            <td className="flex items-center">
                                <input
                                    className="py-3 px-4 cursor-pointer focus:outline-0"
                                    type={visiblePasswords[student._id] ? 'text' : 'password'}
                                    value={student.password || 'N/A'}
                                    readOnly
                                />
                                {visiblePasswords[student._id] ? (
                                    <EyeOff onClick={() => togglePasswordVisibility(student._id)} className="cursor-pointer ml-2" />
                                ) : (
                                    <Eye onClick={() => togglePasswordVisibility(student._id)} className="cursor-pointer ml-2" />
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center py-5 text-gray-500">
                            No data available in table
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default CardData;
