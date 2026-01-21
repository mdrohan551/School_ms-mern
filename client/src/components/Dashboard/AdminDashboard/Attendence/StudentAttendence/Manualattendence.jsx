import React, {useEffect, useState} from "react";
import {Check, Loader} from "lucide-react";
import {useCreateAttendanceMutation} from "../../../../../redux/Features/AttandenceCreate/attendanceCreateAdmin.js";
import toast from "react-hot-toast";
import {useAllClassesQuery} from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";
import {useGetSchoolSingleDetailsQuery} from "../../../../../redux/Features/SchoolAdmin/GeneralSettingsApi.js";
import {useNavigate} from "react-router-dom";
const Manualattendence = () => {
    const navigate = useNavigate();
    // call API
    const {data:schoolSingleData,isLoading:schoolLoading}=useGetSchoolSingleDetailsQuery()
    const {data=[],isLoading:AllClassLoading}=useAllClassesQuery()
    const AllClass =data?.data;
    const [CreateAttendance,{isLoading}] = useCreateAttendanceMutation();
     // today date
    const today = new Date().toISOString().split("T")[0];
    // state hook
    useEffect(() => {
        if (schoolSingleData?.data[0]?._id) {
            setFormData(prev => ({
                ...prev,
                schoolID: schoolSingleData.data[0]._id
            }));
        }
    }, [schoolSingleData]);

    const [formData, setFormData] = useState({
        classID: "",
        date: today,

    });
    const [errorText, setErrorText] = useState("");
    const fields = [
        {
            id: "date",
            type: "date",
            label: "Date",
            placeholder: "",
            required: false,
        },
        {
            id: "classID",
            type: "select",
            label: "Select Class*",
            placeholder: "",
            required: true,
        },
    ];
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const validation = () => {
        const errors = {};
        if (!formData.classID) errors.classID = 'Please select a class';
        if (!formData.date) errors.date = 'Please select a date';
        setErrorText(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) return;

        try {
            const res = await CreateAttendance(formData).unwrap();
            if (res?.status === true) {
                toast.success(res?.message);
                navigate(`/dashboard/std-prasents?classID=${formData.classID}&date=${formData.date}`);
            }


        } catch (error) {
            if(error?.data?.message==='Attendance for this class and date already exists'){
                navigate(`/dashboard/std-prasents?classID=${formData.classID}`);
            }
            toast.error(error?.data?.message || "Something went wrong");
        }
    };


  // common className
    const className ="dark:bg-blue-950 text-gray-800 dark:text-gray-300 bg-gray-200";
    return (
        <div>
            <div className="p-6 pt-10 rounded-2xl border border-gray-300 shadow-md">
                {/* Header Section */}
                <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-center mb-1">
                    Add/update attendance
                </h1>
                <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1">
                        <span className="inline-block w-4 h-2 rounded-full bg-purpleColor"></span>
                        <p className="text-sm text-purpleColor font-medium">Required*</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                        <span className="text-sm text-gray-600 font-medium">Optional</span>
                    </div>
                </div>
                {/* Input Section */}
                <div className="space-y-8">
                    {fields.map((field) => (
                        <div
                            key={field.id}
                            className="relative border border-purple-400 rounded-full p-2"
                        >
                            {field.type === "select" ? (
                                <select
                                    id={field.id}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    className="rounded-full px-3 py-1 focus:outline-none border-none w-full bg-transparent "
                                >
                                    <option className={className} value="">Select a class</option>
                                    {
                                        AllClassLoading?<option className={className} value="">Loading...</option>:
                                            AllClass?.map((opt) => (
                                                <option className={className}  key={opt._id} value={opt._id}>
                                                    {opt.name}
                                                </option>
                                            ))
                                    }

                                </select>
                            ) : (
                                <input
                                    id={field.id}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    className={`rounded-full px-3 py-1 focus:outline-none border-none w-full ${
                                        field.type === "date"
                                            ? "dark:[color-scheme:dark] [color-scheme:light]"
                                            : ""
                                    }`}
                                />
                            )}
                            {
                                errorText[field.id] ?
                                    <label

                                        className="absolute -top-3 left-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
                                    >
                                        {errorText[field.id] }
                                    </label> :
                                    <label
                                        htmlFor={field.id}
                                        className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full"
                                    >
                                        {field.label}
                                    </label>
                            }

                        </div>
                    ))}
                </div>
                {/* Button Section */}
                <div className="flex items-center justify-center mt-8">
                    {
                        isLoading ? <p className="px-5 py-2 dark:bg-cyan-800 bg-indigo-400/50 text-white/80  disabled cursor-not-allowed shadow shadow-white  flex items-center  gap-2 text-sm lowercase rounded-xl"><Loader className="animate-spin" size={18}/>Loading...</p>:
                            <button
                                className="px-5 py-2 dark:bg-cyan-800/50 bg-indigo-400 text-white   cursor-pointer shadow shadow-white  flex items-center  gap-2 text-sm lowercase rounded-xl"
                                onClick={handleSubmit}
                            >
                                <Check size={15} />
                                <span>Submit</span>
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Manualattendence;
