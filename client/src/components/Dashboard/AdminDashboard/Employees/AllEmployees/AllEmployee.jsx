import React, {useState} from 'react'
import Forminput from "./Forminput.jsx";
import {
    useDeleteEmployeeMutation, useGetAllEmployeesQuery, useSearchEmployeesQuery
} from "../../../../../redux/Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";


const AllEmployee = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const {data: allEmployee, isLoading: employeLoading, error: employeeError,refetch} = useGetAllEmployeesQuery();
    const {data: searchEmployee, isLoading: searchLoader, error: searchError} = useSearchEmployeesQuery(searchQuery, {skip: !searchQuery});
    const [deleteEmployee, {isLoading: deleteLoader, Error: deleteError}] = useDeleteEmployeeMutation()
    return (<div className="px-5">
        <div className="max-w-full mx-auto ">
            <Forminput
                allEmployee={allEmployee}
                employeLoading={employeLoading}
                employeeError={employeeError}
                searchEmployee={searchEmployee}
                searchLoader={searchLoader}
                searchError={searchError}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                DeleteEmp={deleteEmployee}
                DeleteEmpLoading={deleteLoader}
                DeleteEmpError={deleteError}
                refetch={refetch}
            />

        </div>
    </div>)
}

export default AllEmployee