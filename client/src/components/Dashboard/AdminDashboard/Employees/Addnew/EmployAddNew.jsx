 import React, {useState} from 'react'
import {IoHomeOutline} from "react-icons/io5";
import Employform from "./Employform.jsx";
import {useCreateEmployeeMutation} from "../../../../../redux/Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";
import toast from "react-hot-toast";
import ToastImgTitle from "../../../ToastImgTitle.jsx";
import {useNavigate} from "react-router-dom";

export const EmployAddNew = () => {
    const navigate = useNavigate();
    const [CreateEmployee, {isLoading, Error}] = useCreateEmployeeMutation();
    const today = new Date();
    const localDate = today.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        userName: "",
        forgotPasswordOtp: "",
        refreshToken: "",
        role: "",
        dateOfJoining: localDate,
        salary: "",
        gender: "",
        experience: "",
        nationalID: "",
        religion: "",
        education: "",
        bloodGroup: "",
        dateOfBirth: "",
        address: "",
    }
    const [Errors, setErrors] = useState({});
    const [logoFile, setLogoFile] = useState('');
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState(initialValues)


    const HandleResetChange = () => {
        const clearedData = Object.fromEntries(Object.keys(formData).map(key => [key, ""]));
        setFormData(clearedData);
        setPreviewUrl("");
        setLogoFile("");
    };


    // validation
    const validation = () => {
        const newError = {}
        if (!formData.name) {
            newError.name = "name Required"
        }
        if (!formData.dateOfJoining) {
            newError.dateOfJoining = "date Of Joining Required"
        }
        if (!formData.email) {
            newError.email = "email Required"
        }
        if (!formData.gender) {
            newError.gender = "gender Required"
        }
        if (!formData.phone) {
            newError.phone = "phone Required"
        }
        if (!formData.salary) {
            newError.salary = "salary Required"
        }
        if (!formData.role) {
            newError.role = "role Required"
        }

        setErrors(newError)
        return Object.keys(newError).length === 0
    }

    const HandleChangeFrom = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }

    const generateRandomString = (length = 8) => {
        return Math.random().toString(36).substring(2, 2 + length);
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (!validation()) return;

        try {
            // Clone formData and replace empty unique fields with random strings
            const filledFormData = {...formData};

            // List of fields you want to ensure unique (adjust as needed)
            const uniqueFields = ["nationalID", "userLockId"];

            uniqueFields.forEach(field => {
                if (!filledFormData[field] || filledFormData[field].trim() === "") {
                    filledFormData[field] = generateRandomString(12);
                }
            });

            const Data = new FormData();

            if (logoFile) {
                Data.append('image', logoFile);
            }

            Data.append('formData', JSON.stringify(filledFormData));


            let res = await CreateEmployee(Data).unwrap();

            if (res.statusCode === 500) {
                toast.error(res.message);
            } else if (res.statusCode === 400) {
                toast.error(res.message);
            } else if (res.statusCode === 201) {

                toast(<ToastImgTitle
                    imgSrc={previewUrl ? previewUrl : "/images/no-logo.png"}
                    title={filledFormData.name}
                    subtitle={filledFormData.role}
                />, {
                    autoClose: 5000, position: "top-center",
                });

                HandleResetChange();
                navigate("/dashboard/all-employees");
            }

        } catch (err) {
            console.log(err, Error);
            toast.error(err.data.message);
        }
    };


    return (<div className='px-6 sm:px-8'>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-2 sm:p-3 flex  items-center  justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white dark:bg-gray-400/20">
                <div className="flex gap-6 justify-center">
                    <h1 className="text-sm sm:text-xl font-medium">Employees</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-sm sm:text-xl"/> {/* Reduced size */}
                        <p className="text-sm sm:text-xl">- New Staff</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        className="bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2">
                        <span className="text-sm">Customize</span>
                    </button>
                </div>
            </div>

            <div className="max-w-full mx-auto ">
                <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center mb-3 mt-2">Employee
                    Form</h1>
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
                <div className="flex items-center space-x-2">
                    <span className="bg-black px-3 py-1 rounded-full text-white">1</span>
                    <h1 className="text-xl font-semibold">Basic Information</h1>
                </div>
                <hr/>
                <Employform
                    HandleChangeFrom={HandleChangeFrom}
                    formData={formData}
                    setFormData={setFormData}
                    HandleSubmit={HandleSubmit}
                    HandleResetChange={HandleResetChange}
                    previewUrl={previewUrl}
                    setPreviewUrl={setPreviewUrl}
                    setLogoFile={setLogoFile}
                    Errors={Errors}
                    isLoading={isLoading}
                    submitText={'Submit'}
                />
            </div>
        </div>)
}
