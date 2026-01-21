import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useGetRoleMutation } from "../redux/Features/auth/AuthApi.js";
import { setRole } from "../redux/slice/authSlice.js";

const AutoRoleSet = () => {
    const dispatch = useDispatch();
    const userLockId = useSelector((state) => state.auth.userLockId)
    const [getRole] = useGetRoleMutation();
    useEffect(() => {
        if (userLockId) {
            (async () => {
                try {
                    const res = await getRole(userLockId).unwrap();
                    dispatch(setRole(res.currentRole));
                } catch (error) {
                    console.error( error);
                }
            })();
        }
    }, [userLockId]);
    return null;
};

export default AutoRoleSet;
