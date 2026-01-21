

import React, { useEffect } from 'react';
import { TfiPlus, TfiReload } from "react-icons/tfi";
import toast from "react-hot-toast";
import InputField from "./InputField.jsx";
import LegendTag from "../../LegendTag.jsx";
import { useNavigate } from "react-router-dom";
import { useSingleClassQuery } from '../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js';


const classInput = [{
    label: "Class Name*", name: "name", placeholder: "Class Name", type: "text", required: true,
}, {
    label: "Monthly Tuition Fees*",
    name: "monthlyFees",
    placeholder: "Monthly Tuition Fees",
    type: "number",
    required: true,
}, {
    label: "Select Class Teacher*", name: "teacherID", type: "select", required: true,
}];


const UpdateForm = ({ onClose, allEmployee, employeLoading, updateClass, classLoading,classID }) => {
    const {data,isLoading,error} = useSingleClassQuery(classID)
 
    useEffect(() => {
          if(data?.data){
            setFormtData((prev)=>({
                ...prev,
              ...data?.data
            }))
          }
    }, [data])
    
    const navigate = useNavigate();
    const [Errors, setErrors] = React.useState([]);
    const [formtData, setFormtData] = React.useState({
        name: "", monthlyFees: "", teacherID: ""

    });


    const validation = () => {
        const messageError = {};
        if (!formtData.name) {
            messageError.name = "class name required *";
            
        }
        if (!formtData.monthlyFees) {
            messageError.monthlyFees = "Monthly Fess required *";
        }
        if (!formtData.teacherID) {
            messageError.teacherID = "select Teacher *";
        }
        setErrors(messageError);

        if (Object.entries(messageError).length > 0) {
            return false; // validation failed
        } else {
            return true; // validation passed
        }

    }
    const HandleChange = (e) => {
        const { name, value } = e.target; //best practice
        setFormtData((p) => ({
            ...p, [name]: value,
        }))


    }
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) return;
        try {
            let res = await updateClass({ UpdateData:formtData, id:classID }).unwrap();
            if (res.statusCode === 400) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
                navigate('/dashboard/classes')
                onClose()
            }
        } catch (err) {
            const message = err?.data?.message || err?.error || "Something went wrong!";
            toast.error(message);

        }
    }
   if(isLoading){
        return <h1>wait class details coming...</h1>
    }
    return (<div className="mt-10">
        <div className="rounded-2xl shadow-xl p-5 max-w-2xl mx-auto bg-white dark:bg-gray-400/10">
            <h1 className="flex items-center justify-center text-2xl font-semibold"></h1>
            <div className="flex items-center justify-center space-x-4 mb-6 mt-2">
                <LegendTag color="bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9]" text="Required*" />
                <LegendTag color="bg-gray-400" text={<span className="text-gray-600">Optional</span>} />
            </div>

            <div className="space-y-6">
                {classInput.map((item, index) => (<div key={index}>
                    {item.type === "select" ? (<div className="relative border border-purpleColor rounded-3xl p-2">
                        <select
                            name={item.name}
                            onChange={HandleChange}
                            value={formtData[item.name]}
                            className="w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 dark:bg-gray-950"
                        >
                            <option value="">{item.label}</option>
                            {employeLoading ?
                                <option>wait option is coming...</option> : allEmployee?.data?.map((opt, i) => (
                                    <option key={i} value={opt._id}>
                                        {opt.name}
                                    </option>))}
                        </select>

                        {Errors[item.name] ? (<div
                            className="absolute -top-3 left-4 bg-gradient-to-r bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {Errors[item.name]}
                        </div>) : (<div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            {item.label}
                        </div>)}
                    </div>) : (<InputField
                        onChange={HandleChange}
                        label={item.label}
                        type={item.type}
                        placeholder={item.placeholder}
                        name={item.name}
                        value={formtData[item.name]}
                        Errors={Errors[item.name]}
                    />)}
                </div>))}


            </div>
            <div className="flex items-center gap-5 justify-center mt-8 mb-5">
                <button
                    onClick={onClose}
                    className="bg-gray-300 dark:bg-gray-700 ring dark:ring-purple-500  text-white font-medium   border border-transparent active:border-gray-400 px-7 py-2 rounded-md flex items-center space-x-2 hover:opacity-90 transition cursor-pointer"
                >
                    cancel
                </button>
                <button
                    onClick={handleUpdateSubmit}
                    className="bg-blue-500 dark:bg-blue-500   text-white font-medium   border border-transparent  px-7 py-2 rounded-md flex items-center space-x-2 hover:opacity-90 transition cursor-pointer"
                >


                    {classLoading ?
                        <>
                            <TfiReload className="text-base animate-spin" />
                            <span>wait...</span>
                        </> :
                        <>
                            <TfiPlus className="text-xl" />
                            <span>Update</span>
                        </>
                    }

                </button>

            </div>

        </div>
    </div>);
};

export default UpdateForm;
