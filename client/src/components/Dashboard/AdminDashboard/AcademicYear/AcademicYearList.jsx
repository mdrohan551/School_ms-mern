import React, { useState, useEffect, useRef } from "react";
import {
    useAcademicYearUpdateMutation,
    useAllAcademicYearQuery,
    useDeleteAcademicYearMutation
} from "../../../../redux/Features/SchoolAdmin/GeneralSettingsApi";
import { Link } from "react-router-dom";
import {Edit, Trash2, Save, X, Loader} from "lucide-react";
import toast from "react-hot-toast";
import { DeleteAlert } from "../../../Swal.js";

const AcademicYearList = () => {
    const { data, isLoading, refetch } = useAllAcademicYearQuery();
    const allAcademicYears = data?.data || [];

    const [deleteAcademicYear, {isLoading: deleteLoadng}] = useDeleteAcademicYearMutation();
    const [AcademicYearUpdate] = useAcademicYearUpdateMutation();

    const [editRowId, setEditRowId] = useState(null);
    const [formData, setFormData] = useState({ startYear: null, endYear: null });
    const [isBlink, setIsBlink] = useState(false);

    const startYearRef = useRef(null);
    const [deletingId, setDeletingId] = useState(null);

    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for(let y = 2000; y <= currentYear + 5; y++) {
        yearOptions.push(y);
    }

    const parseYears = (name) => {
        if (!name) return { startYear: currentYear, endYear: currentYear + 1 };
        const parts = name.split("-");
        if (parts.length === 2) {
            return { startYear: Number(parts[0]), endYear: Number(parts[1]) };
        }
        return { startYear: currentYear, endYear: currentYear + 1 };
    };

    useEffect(() => {
        if(editRowId !== null){
            setIsBlink(true);
            const timer = setTimeout(() => setIsBlink(false), 2000);
            if(startYearRef.current){
                startYearRef.current.focus();
            }
            return () => clearTimeout(timer);
        }
    }, [editRowId]);

    const handleEdit = (year) => {
        setEditRowId(year._id);
        const { startYear, endYear } = parseYears(year.name);
        setFormData({ startYear, endYear });
    };

    const handleCancel = () => {
        setEditRowId(null);
        setFormData({ startYear: null, endYear: null });
    };

    const handleSave = async (id) => {
        if (!formData.startYear || !formData.endYear || formData.endYear <= formData.startYear) {
            toast.error("Please select valid Start Year and End Year");
            return;
        }
        const name = `${formData.startYear}-${formData.endYear}`;
        try {
            const res = await AcademicYearUpdate({ id, name }).unwrap();
            if (res.status === true) {
                toast.success(res.message);
                setEditRowId(null);
                refetch();
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            toast.error(err?.data?.message || "Update failed");
        }
    };

    const handleDelete = async (id) => {
        try {
            let isConfirm = await DeleteAlert();
            if (isConfirm) {
                setDeletingId(id); // ডিলিটিং শুরু
                const res = await deleteAcademicYear(id).unwrap();
                if (res.status === true) {
                    toast.success(res.message);
                    refetch();
                } else {
                    toast.error(res.message);
                }
            }
        } catch (err) {
            toast.error(err?.data?.message || "Delete failed");
        } finally {
            setDeletingId(null); // ডিলিটিং শেষ
        }
    };


    return (
        <div className="max-w-7xl mx-auto mt-6 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-md">
            <p className="capitalize text-xs sm:text-sm py-2 mb-4">
                <Link className="hover:underline text-blue-500" to={"/dashboard/academic-year"}>
                    form {">"}
                </Link>{" "}
                List
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-2">
                📚 Academic Years
            </h3>

            {isLoading ? (
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 animate-pulse">
                    Loading all academic years...
                </div>
            ) : allAcademicYears.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 rounded-lg text-xs sm:text-sm">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border px-2 sm:px-4 py-1 sm:py-2">Logo</th>
                            <th className="border px-2 sm:px-4 py-1 sm:py-2">Institute</th>
                            <th className="border px-2 sm:px-4 py-1 sm:py-2">Academic Year</th>
                            <th className="border px-2 sm:px-4 py-1 sm:py-2 hidden md:table-cell">Phone</th>
                            <th className="border px-2 sm:px-4 py-1 sm:py-2 hidden lg:table-cell">Address</th>
                            <th className="border px-2 sm:px-4 py-1 sm:py-2 hidden lg:table-cell">District</th>
                            <th className="border px-2 sm:px-4 py-1 sm:py-2">Status</th>
                            <th className="border px-2 sm:px-4 py-1 sm:py-2 text-center">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {allAcademicYears.map((year) => (
                            <tr key={year._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="border px-2 sm:px-3 py-1 sm:py-2 text-center">
                                    <img
                                        src={year.schoolinfo?.logoImage || "/default-logo.png"}
                                        alt="logo"
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mx-auto"
                                    />
                                </td>
                                <td className="border px-2 sm:px-3 py-1 sm:py-2 whitespace-nowrap">
                                    {year.schoolinfo?.instituteName || "N/A"}
                                </td>

                                <td className="border px-2 sm:px-3 py-1 sm:py-2">
                                    {editRowId === year._id ? (
                                        <div className="flex space-x-1 sm:space-x-2">
                                            <select
                                                ref={startYearRef}
                                                value={formData.startYear}
                                                onChange={(e) => {
                                                    const newStartYear = Number(e.target.value);
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        startYear: newStartYear,
                                                        endYear: prev.endYear <= newStartYear ? newStartYear + 1 : prev.endYear,
                                                    }));
                                                }}
                                                className={`border px-1 sm:px-2 py-1 rounded dark:bg-gray-700 dark:text-white
                                                        ${isBlink ? 'ring-4 ring-green-300 animate-pulse' : ''}`}
                                                aria-label="Start Year"
                                            >
                                                {yearOptions.map((y) => (
                                                    <option key={y} value={y}>{y}</option>
                                                ))}
                                            </select>

                                            <select
                                                value={formData.endYear}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, endYear: Number(e.target.value) }))}
                                                className={`border px-1 sm:px-2 py-1 rounded dark:bg-gray-700 dark:text-white
                                                        ${isBlink ? 'ring-4 ring-yellow-400 animate-pulse' : ''}`}
                                                aria-label="End Year"
                                            >
                                                {yearOptions
                                                    .filter((y) => y > formData.startYear)
                                                    .map((y) => (
                                                        <option key={y} value={y}>{y}</option>
                                                    ))}
                                            </select>
                                        </div>
                                    ) : (
                                        year.name
                                    )}
                                </td>
                                <td className="border px-2 sm:px-3 py-1 sm:py-2 hidden md:table-cell whitespace-nowrap">
                                    {year.schoolinfo?.phone || "N/A"}
                                </td>
                                <td className="border px-2 sm:px-3 py-1 sm:py-2 hidden lg:table-cell whitespace-nowrap">
                                    {year.schoolinfo?.address || "N/A"}
                                </td>
                                <td className="border px-2 sm:px-3 py-1 sm:py-2 hidden lg:table-cell whitespace-nowrap">
                                    {year.schoolinfo?.countresAndZila || "N/A"}
                                </td>
                                <td className="border px-2 sm:px-3 py-1 sm:py-2 text-center whitespace-nowrap">
                                        <span className={`px-2 sm:px-3 py-0.5 text-xs sm:text-sm rounded-full font-semibold
                                            ${year.schoolinfo?.status === "Active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                                            {year.schoolinfo?.status || "Unknown"}
                                        </span>
                                </td>
                                <td className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-3 py-2">
                                    {editRowId === year._id ? (
                                        <>
                                            <button onClick={() => handleSave(year._id)} className="text-green-600 hover:text-green-800 p-1 sm:p-2 rounded">
                                                <Save size={18} />
                                            </button>
                                            <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-1 sm:p-2 rounded">
                                                <X size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(year)} className="text-blue-600 hover:text-blue-800 p-1 sm:p-2 rounded">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(year._id)} className="text-red-600 hover:text-red-800 p-1 sm:p-2 rounded">
                                                {deletingId === year._id ? (
                                                    <Loader size={18} className="animate-spin" />
                                                ) : (
                                                    <Trash2 size={18} />
                                                )}
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-300">No academic years found.</p>
            )}
        </div>
    );
};

export default AcademicYearList;
