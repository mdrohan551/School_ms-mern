import React from 'react';

import DashboardHome from "../../components/Dashboard/AdminDashboard/DashboardHome/DashboardHome.jsx";
import Loader from '../../Loader/Loader.jsx';


const AdminHome = () => {
    return (

            <Loader>
               <div className="pr-1 sm:pr-5">
                   <DashboardHome />
               </div>
            </Loader>

    );
};

export default AdminHome;