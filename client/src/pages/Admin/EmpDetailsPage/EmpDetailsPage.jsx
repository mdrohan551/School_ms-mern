import React from 'react';
import EmployeeDetails from "../../../components/Dashboard/AdminDashboard/Employees/EmpDetails/EmployeeDetails.jsx";
import EmpDetailsSidebar from "../../../components/Dashboard/AdminDashboard/Employees/EmpDetails/EmpDetailsSidebar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEmployeeDetailsQuery} from "../../../redux/Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";
import toast from "react-hot-toast";
import Loader from "../../../Loader/Loader.jsx";

const EmpDetailsPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {data,isLoading,error}=useEmployeeDetailsQuery(id)
    if(error) {
        navigate('/dashboard/all-employees');
        toast.error(error);
        window.location.reload();

    }

    if(isLoading) return <Loader/>
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
                <EmpDetailsSidebar empDetails={data}/>

            </div>
            <div className="col-span-9 ">
                <EmployeeDetails/>
            </div>


        </div>
    );
};

export default EmpDetailsPage;