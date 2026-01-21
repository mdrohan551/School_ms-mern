import React, {useState, useEffect} from "react";
import {
    useGetAllAttendanceQuery, useUpdateAttendanceMutation,
} from "../../../../../redux/Features/AttandenceCreate/attendanceCreateAdmin.js";
import {useSearchParams} from "react-router-dom";
import {useSingleClassQuery} from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";
import toast from "react-hot-toast";
import {ChevronRight, X} from "lucide-react";

const CheckIcon = ({className}) => (<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
>
    <path d="M20 6L9 17l-5-5"/>
</svg>);

const StudentPrasentsUpdate = () => {
    const [searchParams] = useSearchParams();
    const classID = searchParams.get("classID");
    const date = searchParams.get("date");

    const {data: attendanceData, isLoading, isError,refetch} = useGetAllAttendanceQuery(
        { classID, date },
        { skip: !classID || !date }
    );
    const [updateAttendance, {isLoading: updating}] = useUpdateAttendanceMutation();
    const {data: singleClass} = useSingleClassQuery(classID);

    const [payload, setPayload] = useState({
        schoolID: "", classID: "", attendanceList: [],
    });
     console.log(attendanceData)
    useEffect(() => {
        if (attendanceData?.data && singleClass?.data) {
            setPayload({
                schoolID: singleClass.data.schoolID,
                classID: classID,
                attendanceList: attendanceData.data.map((std) => ({
                    attendanceID: std._id, status: std.status,
                })),
            });
        }
    }, [attendanceData, singleClass, classID,  refetch]);

    const present = payload.attendanceList.filter((p) => p.status === "Present").length;
    const absent = payload.attendanceList.filter((p) => p.status === "Absent").length;

    const toggle = (id) => {
        setPayload((prev) => ({
            ...prev, attendanceList: prev.attendanceList.map((item) => item.attendanceID === id ? {
                ...item, status: item.status === "Present" ? "Absent" : "Present",
            } : item),
        }));
    };

    const HandleUpdate = async (e) => {
        e.preventDefault();
        const res = await updateAttendance(payload).unwrap();
        if (res?.status === true) {
            toast.success(res?.message);
            refetch()
        }
    };

    if (isLoading) return <div className="text-center py-10 text-gray-600 dark:text-gray-400">Loading
        attendance...</div>;
    if (isError) return <div className="text-center py-10 text-red-500">Failed to load data.</div>;

    return (<div className=" px-0 sm:px-5 mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl font-sans transition-all duration-300 relative  pb-20">
        {/* Header with Parallax Effect */}
        <div className="sticky -top-8 sm:-top-5 z-50 h-20 sm:h-60 overflow-hidden group">
            <img
                src="/images/images.jpg"
                alt="Class Banner"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform rounded-lg duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-black/50 opacity-90 rounded-lg"></div>
            <div className="absolute inset-0 flex sm:flex-col gap-5 sm:gap-0  items-center justify-center text-white text-center px-6">
                <div className="flex flex-col items-start ">
                    <h2 className="text-xl sm:font-extrabold md:text-4xl font-medium tracking-tight drop-shadow-lg">
                        {singleClass?.data?.name}
                    </h2>
                    <p className="text-[0.8rem] sm:text-lg opacity-90 mt-2 drop-shadow">
                        {new Date().toLocaleDateString("en-US", {dateStyle: "full"})}
                    </p>
                </div>
                <div className="flex gap-8 mt-5 bg-black/20 backdrop-blur-sm px-2 py-2   sm:px-6 sm:py-3 rounded-lg shadow-lg">
                    <div className="text-center">
                        <div className="bg-emerald-500/50 text-white  px-1 py-1 sm:px-4  sm:py-2 rounded-lg font-bold text-sm sm:text-lg shadow-md">
                            {present}
                        </div>
                        <div className="sm:text-xs text-[0.rem] mt-1 opacity-90">Present</div>
                    </div>
                    <div className="text-center">
                        <div className="bg-rose-500/50 text-white px-1 py-1 sm:px-4  sm:py-2 rounded-lg font-bold text-sm sm:text-lg shadow-md">
                            {absent}
                        </div>
                        <div className="sm:text-xs text-[0.rem] mt-1 opacity-90">Absent</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Table */}
        <div className="px-1 sm:px-6 py-6 overflow-x-auto">
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
                <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800/60">
                    <th className="py-3 text-left font-semibold text-gray-800 dark:text-gray-200 pl-2">Student</th>
                    <th className="py-3 text-center font-semibold text-gray-800 dark:text-gray-200">ID</th>
                    <th className="py-3 text-center font-semibold text-gray-800 dark:text-gray-200">Roll</th>
                    <th className="py-3 text-center font-semibold text-gray-800 dark:text-gray-200">Status</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {payload.attendanceList.map((item, index) => {
                    const std = attendanceData.data.find((s) => s._id === item.attendanceID);
                    return (<tr
                        key={item.attendanceID}
                        className="hover:bg-indigo-50 dark:hover:bg-slate-800/40 transition-all duration-200"
                    >
                        <td className="py-4 pl-2 flex items-center gap-3">
                            <img
                                src={std?.logo || "/images/no-image.png"}
                                alt={std?.studentName}
                                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900 shadow-sm"
                                onError={(e) => (e.target.src = "/images/no-image.png")}
                            />
                            <div className="flex flex-col min-w-0">
                                            <span
                                                className="font-medium text-gray-900 dark:text-gray-200 truncate max-w-xs">
                                                {std?.studentName}
                                            </span>
                                <div
                                    className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {item.status === "Present" ? (<>
                                        <CheckIcon className="w-3 h-3 text-green-500 mr-1"/>
                                        <span>Present</span>
                                    </>) : (<>
                                        <X className="w-3 h-3 text-red-500 mr-1"/>
                                        <span>Absent</span>
                                    </>)}
                                </div>
                            </div>
                        </td>
                        <td className="py-4 sm:px-2 text-center">
                                        <span
                                            className="inline-block bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs px-3 py-1 rounded-full font-medium"
                                            title={std?.ID}
                                        >
                                            {std?.ID}
                                        </span>
                        </td>
                        <td className="py-4 px-1 sm:px-2 text-center">
                                        <span
                                            className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                        </td>
                        <td className="py-4 text-center">
                            <button
                                onClick={() => toggle(item.attendanceID)}
                                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${item.status === "Present" ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-rose-500 to-rose-600"}`}
                            >
                                            <span
                                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${item.status === "Present" ? "translate-x-8" : "translate-x-1"}`}
                                            />
                                <span
                                    className="absolute left-2.5 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                P
                                            </span>
                                <span
                                    className="absolute right-2.5 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                A
                                            </span>
                            </button>
                        </td>

                    </tr>);
                })}
                </tbody>
            </table>
        </div>

        {/* Fixed Save Button - Responsive & Always Visible */}
        <div className="sticky bottom-6 sm:fixed sm:right-6  z-50 pointer-events-none sm:pointer-events-auto">
            <button
                onClick={HandleUpdate}
                disabled={updating}
                className={`${updating ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"} text-white px-7 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-opacity-50 pointer-events-auto min-w-[180px]`}
            >
                {updating ? (<span className="flex items-center justify-center">
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Saving...
      </span>) : ("Update Attendance")}
            </button>
        </div>
    </div>);
};

export default StudentPrasentsUpdate;