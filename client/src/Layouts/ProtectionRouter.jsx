import React, {useEffect, useRef} from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";

const ProtectionRouter = ({allowRole}) => {
    const currentRole = useSelector((state) => state.auth.role);
    const location = useLocation();
    const toastShownRef = useRef(false); // prevent multiple toast

    // 🔐 User not logged in
    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (currentRole !== allowRole) {
        if (!toastShownRef.current) {
            toast.error("Access denied! You think you are smart? 😡");
            toastShownRef.current = true;
        }
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectionRouter;
