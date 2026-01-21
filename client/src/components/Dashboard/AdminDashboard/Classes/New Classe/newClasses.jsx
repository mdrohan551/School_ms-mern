import React from 'react';
import {IoHomeOutline} from "react-icons/io5";
import Form from "./form.jsx";
import {useGetAllEmployeesQuery} from "../../../../../redux/Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";
import {useCreateClassMutation} from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const NewClasses = () => {
    const {data: allEmployee, isLoading: employeLoading, error: employeeError,refetch} = useGetAllEmployeesQuery();
    const [CreateClass,{isLoading:classLoading,error}] = useCreateClassMutation()
    if(employeeError) {
        toast.error("something went wrong!")
        refetch()

    }
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white dark:bg-gray-700/50">
                <div className="flex  items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-sm sm:text-xl ">Classes</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-xl"/>
                        <p className="text-sm sm:text-xl">- Add New Class</p>
                    </div>
                </div>
            </div>
            <div className="max-w-full mx-auto">
                <Form allEmployee={allEmployee}  employeLoading={employeLoading} createClass={CreateClass}  classLoading={classLoading} classError={error} create={true} />
            </div>
        </div>
    );
};

export default NewClasses;