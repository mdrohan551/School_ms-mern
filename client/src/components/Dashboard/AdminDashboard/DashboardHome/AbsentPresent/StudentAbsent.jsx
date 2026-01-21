import React from 'react';
import { useGetAllAttendanceQuery } from '../../../../../redux/Features/AttandenceCreate/attendanceCreateAdmin.js';

const StudentAbsent = () => {
    const { data, isLoading, error, refetch } = useGetAllAttendanceQuery();

    // Safely extract students, default to empty array
    const allStudents = data?.data || [];
    // Refetch on component mount or as needed (optional)
    React.useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return (
            <div className="flex px-5 pb-20">
                <div className="card flex items-center justify-center p-5">
                    <span className="loading loading-spinner loading-md"></span>
                    <span className="ml-2">Loading attendance...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex px-5 pb-20">
                <div className="card bg-error text-white p-4 rounded">
                    <p>Failed to load attendance data.</p>
                    <button onClick={() => refetch()} className="btn btn-ghost btn-sm mt-2">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Filter only absent students (assuming `status` or `present` field exists)
    const absentStudents = allStudents.filter(
        (student) => !student.present // or student.status === 'absent'
    );

    if (absentStudents.length === 0) {
        return (
            <div className="px-5 pb-20">
                <div className="card bg-base-200 p-4 rounded">
                    <p className="text-gray-600">No absent students today.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col px-5 pb-20">
            <h3 className="text-lg font-semibold mb-4">Absent Students</h3>
            <div className="flex flex-wrap gap-4">
                {absentStudents.map((student, index) => (
                    <div key={student.id || index} className="card flex items-center gap-3 p-3 bg-base-100 rounded-box shadow-sm">
                        <img
                            src={student.logo==="null" ? '/images/no-image.png' : student.logo ||'/images/no-image.png' }
                            alt={`${student.name || 'Student'}'s profile`}
                            className="w-10 h-10 rounded-full ring-2 ring-red-500 object-cover"
                        />
                        <div className="flex flex-col">
                            <p className="font-medium text-sm">{student.studentName || 'Unknown'}</p>
                            <span className="text-xs text-red-500">Absent</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentAbsent;