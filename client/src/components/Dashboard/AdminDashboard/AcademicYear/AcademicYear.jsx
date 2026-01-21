import React, { useState } from "react";
import {
    useAcademicYearMutation,
    useGetSchoolSingleDetailsQuery
} from "../../../../redux/Features/SchoolAdmin/GeneralSettingsApi";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const AcademicYearForm = () => {
    const { data, isLoading: detailLoading } = useGetSchoolSingleDetailsQuery();
    const [createAcademicYear, { isLoading }] = useAcademicYearMutation();



    const schoolID = data?.data[0]?._id;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

    const [startYear, setStartYear] = useState(currentYear);
    const [endYear, setEndYear] = useState(currentYear + 1);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = `${startYear}-${endYear}`;
        const payload = { name, schoolID };

        try {
            const res = await createAcademicYear(payload).unwrap();
            if (res?.status === false) {
                toast.error(res?.message);
            } else {
                toast.success(res?.message);
                navigate('/dashboard/academic-year?all-academic-years=true')
            }
        } catch (err) {
            toast.error(err?.data?.message || "Something went wrong");
        }
    };

    if (detailLoading) return <p>Loading...</p>;
    if (!schoolID) return <p>No school ID found.</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2 text-center text-gray-800 dark:text-white">
                Add Academic Year
            </h2>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-4">
                The <span className="text-sm font-bold text-red-600 dark:text-red-400">Academic Year</span> section is set up solely by the Super Admin and is intended for display purposes only.
            </p>



            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Start Year</label>
                    <select
                        value={startYear}
                        onChange={(e) => setStartYear(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded"
                        required
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">End Year</label>
                    <select
                        value={endYear}
                        onChange={(e) => setEndYear(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded"
                        required
                    >
                        {years
                            .filter((year) => year > startYear)
                            .map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                    </select>
                </div>

                <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Academic Year: <span className="text-blue-600 dark:text-blue-400">{`${startYear}-${endYear}`}</span>
                </div>

                <input type="hidden" name="schoolID" value={schoolID} />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AcademicYearForm;
