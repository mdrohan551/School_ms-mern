import React from 'react';
import Pagination from "../../../Pagination.jsx";

const FormSection = ({
                         students, searchTerm, allClasses, isLoading,
                         currentPage, setCurrentPage, totalPages,
                         showPagination, startStudent, endStudent, total
                     }) => {

    const classes = allClasses?.data || [];
    const filteredStudents = students.filter((student) => {
        const search = searchTerm.toLowerCase();
        return (
            student.name?.toLowerCase().includes(search) ||
            student.fatherName?.toLowerCase().includes(search) ||
            student.registrationNumber?.toString().includes(search) ||
            student.phone?.toString().includes(search)
        );
    });

    return (
        <div className="mt-8 overflow-x-auto">
            <div className="flex mb-4 flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4 text-sm text-gray-600">
                <p>
                    {
                        showPagination && startStudent !== null && endStudent !== null
                            ? `Showing ${startStudent} to ${endStudent} of ${total} entries`
                            : filteredStudents.length > 0
                                ? `Showing 1 to ${filteredStudents.length} of ${filteredStudents.length} entries`
                                : `Showing 0 of 0 entries`
                    }
                </p>
            </div>

            {/* ✅ Desktop Table */}
            <table className="min-w-full border border-gray-400 shadow-md rounded-xl overflow-hidden hidden md:table">
                <thead className="bg-[#5D5FEF] text-white">
                <tr>
                    <th className="p-3 border">Sr</th>
                    <th className="p-3 border">Student Name</th>
                    <th className="p-3 border">Father Name</th>
                    <th className="p-3 border">Class</th>
                    <th className="p-3 border">Phone</th>
                    <th className="p-3 border">Reg. No</th>
                    <th className="p-3 border">Admission Date</th>
                    <th className="p-3 border">Image</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.length > 0 ? (
                    isLoading ? (
                        <tr><td colSpan="8" className="p-4 text-center">Loading...</td></tr>
                    ) : (
                        filteredStudents.map((student, index) => (
                            <tr key={student._id} className="text-center">
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{student.name || "N/A"}</td>
                                <td className="p-2 border">{student.FatherName || "N/A"}</td>
                                <td className="p-2 border">
                                    {classes.find((cls) => cls._id === student.classID)?.name || "N/A"}
                                </td>
                                <td className="p-2 border">{student.phone || "N/A"}</td>
                                <td className="p-2 border">{student.registrationNumber || "N/A"}</td>
                                <td className="p-2 border">
                                    {student.dateOfAdmission
                                        ? new Date(student.dateOfAdmission).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td className="p-2 border">
                                    <img
                                        src={student.image && student.image !== "null" ? student.image : '/images/no-image.png'}
                                        alt="student"
                                        className="w-12 h-12 object-cover rounded-full mx-auto"
                                    />
                                </td>
                            </tr>
                        ))
                    )
                ) : (
                    <tr><td colSpan="8" className="p-4 text-center text-gray-500">No matching student found</td></tr>
                )}
                </tbody>
            </table>

            {/* ✅ Mobile Cards */}
            <div className="md:hidden space-y-4">
                {filteredStudents.length > 0 ? (
                    isLoading ? (
                        <p className="text-center">Loading...</p>
                    ) : (
                        filteredStudents.map((student, index) => (
                            <div key={student._id} className="border rounded-lg p-4 shadow-sm ">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold">#{index + 1}</span>
                                    <img
                                        src={student.image && student.image !== "null" ? student.image : '/images/no-image.png'}
                                        alt="student"
                                        className="w-12 h-12 object-cover rounded-full"
                                    />
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 ">
                                    <p><strong>Name:</strong> {student.name || "N/A"}</p>
                                    <p><strong>Father:</strong> {student.FatherName || "N/A"}</p>
                                    <p><strong>Class:</strong> {classes.find(cls => cls._id === student.classID)?.name || "N/A"}</p>
                                    <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
                                    <p><strong>Reg. No:</strong> {student.registrationNumber || "N/A"}</p>
                                    <p><strong>Admission:</strong> {student.dateOfAdmission ? new Date(student.dateOfAdmission).toLocaleDateString() : "N/A"}</p>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <p className="text-center text-gray-500">No matching student found</p>
                )}
            </div>

            {/* ✅ Pagination */}
            {filteredStudents.length > 0 ? (
                showPagination && (
                    <div className="mt-4 mb-6  px-2">
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </div>
                )
            ) : null}
        </div>
    );
};

export default FormSection;
