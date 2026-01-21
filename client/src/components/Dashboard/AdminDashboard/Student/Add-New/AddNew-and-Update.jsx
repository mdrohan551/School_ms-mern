import React, {useEffect, useState} from 'react';
import {IoHomeOutline} from "react-icons/io5";
import {Download} from 'lucide-react';
import Admissionform from "./Admissionform.jsx";
import {ResetWarningAlert} from "../../../../Swal.js";
import {useAllClassesQuery} from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";
import toast from "react-hot-toast";
import {
    useCreateStudentMutation,
    useSingleStudentQuery, useUpdateStudentMutation
} from "../../../../../redux/Features/StudentCreateAdmin/StudentCreateAdmin.js";
import {useNavigate} from "react-router-dom";

const AddNewAndUpdate = () => {
    const navigate = useNavigate();
    // get id form query params
    const queryParams = new URLSearchParams(location.search);
    const studentID = queryParams.get('studentId');
    const {data: SingleStudent, isLoading: singleStudentLoading} = useSingleStudentQuery(studentID, {skip: !studentID})
    const {data: allClasses, isLoading: allClassLoading, refetch} = useAllClassesQuery();
    const [UpdateStuent, {isLoading: udpateLoading}] = useUpdateStudentMutation()
    const [CreateStudent, {isLoading, error}] = useCreateStudentMutation()
    const [logoFile, setLogoFile] = useState('');
    const [previewUrl, setPreviewUrl] = useState("");


    const initialValues = {
        name: "",
        FatherName: "",
        FatherNationalID: "",
        phone: "",
        profession: "",
        registrationNumber: "",
        dateOfAdmission: new Date().toISOString().split('T')[0],
        discount: "",
        dateOfBirth: "",
        birthID: "",
        gender: "",
        previousSchool: "",
        religion: "",
        bloodGroup: "",
        totalSiblings: "",
        note: "",
        address: "",
        role: "",
        classID: "",
        schoolID: "",

    }


    // student form Data
    const [formData, setFormData] = useState(initialValues);
    const [Erros, setErrors] = useState({})


    useEffect(() => {
        if (SingleStudent?.data?.length > 0 && studentID) {
            const studentData = SingleStudent.data[0];

            // যদি classDetails আসে তবে classID সেট করো
            const updatedFormData = {
                ...studentData,
                classID: studentData.classDetails?._id || studentData.classID || "",
                dateOfAdmission: studentData.dateOfAdmission?.split("T")[0] || "",
                dateOfBirth: studentData.dateOfBirth?.split("T")[0] || "",
            };

            setFormData(prev => ({
                ...prev,
                ...updatedFormData,
            }));

            if (studentData?.image) {
                setPreviewUrl(studentData.image);
            }
        }else {
            // No studentID বা data নাই => ফর্ম reset
            setFormData({ ...initialValues });
            setPreviewUrl("");
        }







    }, [SingleStudent, studentID]);


    // validation
    const validation = () => {
        const newError = {}
        if (!formData.name) {
            newError.name = "name Required"
        }
        if (!formData.registrationNumber) {
            newError.registrationNumber = "registration Number Required"
        }
        if (!formData.classID) {
            newError.classID = "class selected Required"
        }
        if (!formData.gender) {
            newError.gender = "gender Required"
        }
        if (!formData.dateOfAdmission) {
            newError.dateOfAdmission = "date Of Admission Required"
        }
        if (!formData.discount) {
            newError.discount = "discount fee Required"
        }
        if (!formData.birthID) {
            newError.birthID = "birtht id fee Required"
        }
        if (!formData.gender) {
            newError.gender = "gender  Required"
        }
        if (!formData.religion) {
            newError.religion = "religion  Required"
        }

        setErrors(newError)
        return Object.keys(newError).length === 0
    }
    // write input value onchange
    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const HandleResetChange = async () => {
        const waring = await ResetWarningAlert()
        if (waring) {
            const clearedData = Object.fromEntries(Object.keys(formData).map(key => [key, ""]));
            setFormData(clearedData);
            setPreviewUrl("");
            setLogoFile("");
        }


    };

// ...
    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) {
            toast.error("Please fill in all fields")
            return;
        };
        try {
            const Data = new FormData();

            // সব টেক্সট ডেটা FormData-তে যোগ করুন
            for (const key in formData) {
                Data.append(key, formData[key]);
            }

            if (logoFile) {
                Data.append('image', logoFile);
            }

            if (studentID && SingleStudent) {
                const res = await UpdateStuent({ formData: Data, id: studentID }).unwrap();
                toast.success(res?.message || "Student Updated!");
            } else {
                const res = await CreateStudent(Data).unwrap();
                toast.success(res?.message);
            }

            navigate("/dashboard/allstudent");
        } catch (error) {
            console.log(error, Error);
            toast.error(error.data.message);
        }
    }
// ...


    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white dark:bg-gray-700/50">
                <div className="flex  items-start sm:items-center gap-2 sm:gap-6">
                    <h1 className="text-sm sm:text-xl font-medium">Students</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-sm sm:text-xl"/> {/* Reduced size */}
                        <p className="text-sm sm:text-xl">- Admission Form</p>

                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        className="bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2">
                        <Download className="text-[0.5rem] sm:text-sm"/>
                        <span className="text-[0.8rem] sm:text-sm">Import Student</span>
                    </button>
                </div>
            </div>
            <div className="max-w-full mx-auto mr-8">
                <Admissionform
                    setLogoFile={setLogoFile}
                    setPreviewUrl={setPreviewUrl}
                    previewUrl={previewUrl}
                    formData={formData}
                    HandleChange={HandleChange}
                    HandleResetChange={HandleResetChange}
                    validation={Erros}
                    HandleSubmit={HandleSubmit}
                    buttonType={studentID && SingleStudent ? 'Update' : 'Submit'}
                    isLoading={isLoading || udpateLoading}
                    allClasses={allClasses}
                    allClassLoading={allClassLoading}

                />
            </div>
        </div>
    );
};

export default AddNewAndUpdate;
