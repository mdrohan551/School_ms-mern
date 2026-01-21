import React, {useEffect, useState} from "react";
import Employform from "./Addnew/Employform.jsx";
import {
    useEmployeeDetailsQuery,
    useUpdateEmployeeMutation
} from "../../../../redux/Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";
import toast from "react-hot-toast";

const Modal = ({isOpen, onClose, empId}) => {

    const initialValues = {
        name: "",
        phone: "",
        email: "",
        userName: "",
        password: "",
        forgotPasswordOtp: "",
        refreshToken: "",
        role: "",
        dateOfJoining: "",
        salary: "",
        gender: "",
        experience: "",
        nationalID: "",
        religion: "",
        education: "",
        bloodGroup: "",
        dateOfBirth: "",
        address: "",
    };


    const [logoFile, setLogoFile] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState(initialValues);
    const {data, isLoading: EmployeeDetailsLoader, error: EmployeeDetailsError,refetch} = useEmployeeDetailsQuery(empId)
    const [UpdateEmployee, {isLoading, error}] = useUpdateEmployeeMutation();
    const [Errors, setErrors] = useState({});


    useEffect(() => {
        if (data?.data) {
            setFormData((prev) => ({
                ...prev,
                ...data.data
            }));
        }
    }, [data]);


    const HandleResetChange = () => {
        const clearedData = Object.fromEntries(
            Object.keys(formData).map((key) => [key, ""])
        );
        setFormData(clearedData);
        setPreviewUrl("");
        setLogoFile("");
    };

    const HandleChangeFrom = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validation = () => {
        const newError = {}
        if (!formData.name ) {
            newError.name = "name Required"
        }
        if (!formData.salary ) {
            newError.salary = "salary Required"
        }
        if (!formData.role ) {
            newError.role = "role Required"
        }
        if (!formData.email ) {
            newError.email = "email Required"
        }
        if (!formData.gender ) {
            newError.gender = "gender Required"
        }
        if (!formData.phone ) {
            newError.phone = "phone Required"
        }

        setErrors(newError)
        return Object.keys(newError).length === 0
    }

    const HandleUpdate = async (e) => {
        e.preventDefault();
        if (!validation()) return;
        try {

            const update = new FormData();
            if (logoFile) {
                update.append('image', logoFile);
            }

            update.append('formData', JSON.stringify(formData));
            let res = await UpdateEmployee({ UpdateData: update, id: empId }).unwrap();

            if (res.statusCode === 500) {
                toast.error(res.message);
                refetch()
            } else if (res.statusCode === 400) {
                toast.error(res.message);
                refetch()
            }else if(res.statusCode === 200) {
               toast.success(res.message);
                refetch()
                onClose()

            }

        } catch (err) {
            console.log(err);
            toast.error(err.data.message);
        }


    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-2 sm:px-4">
            <div
                className="relative w-full max-w-4xl bg-white overflow-auto dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-10 right-10 text-5xl font-light text-gray-500 hover:text-red-600 z-50"
                >
                    &times;
                </button>

                {/* Modal Content */}
                <div className="p-4 sm:p-8">

                    <div className="flex items-center justify-center space-x-4 ">

                        <div className="flex items-center space-x-1">
                            <span className="inline-block w-4 h-2 rounded-full bg-purpleColor"></span>
                            <p className="text-sm text-purpleColor font-medium">Required*</p>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                            <span className="text-sm text-gray-600 font-medium">Optional</span>
                        </div>

                    </div>

                    {
                        EmployeeDetailsLoader ? "wait please ..." : <Employform
                            HandleChangeFrom={HandleChangeFrom}
                            formData={formData}
                            setFormData={setFormData}
                            HandleSubmit={HandleUpdate}
                            HandleResetChange={HandleResetChange}
                            previewUrl={previewUrl}
                            setPreviewUrl={setPreviewUrl}
                            setLogoFile={setLogoFile}
                            Errors={Errors}
                            isLoading={isLoading}
                            submitText={"update"}

                        />
                    }
                </div>

            </div>

        </div>
    );
};

export default Modal;
