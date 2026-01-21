import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice.js";
import AuthApi from "../Features/auth/AuthApi.js";
import GeneralSettingApi from "../Features/SchoolAdmin/GeneralSettingsApi.js";
import EmployeeCreateAdmin from "../Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";
import CreateClassAdmin from "../Features/createClassAdmin/ClassCreateAdmin.js";
import StudentCreateAdmin from "../Features/StudentCreateAdmin/StudentCreateAdmin.js";
import createAttendance from "../Features/AttandenceCreate/attendanceCreateAdmin.js";


export const Store = configureStore({
    reducer: {
        auth: authSlice,
        [AuthApi.reducerPath]: AuthApi.reducer,
        [GeneralSettingApi.reducerPath]: GeneralSettingApi.reducer,
        [EmployeeCreateAdmin.reducerPath]:EmployeeCreateAdmin.reducer,
        [CreateClassAdmin.reducerPath]:CreateClassAdmin.reducer,
        [StudentCreateAdmin.reducerPath]:StudentCreateAdmin.reducer,
        [createAttendance.reducerPath]:createAttendance.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthApi.middleware,GeneralSettingApi.middleware,EmployeeCreateAdmin.middleware,CreateClassAdmin.middleware,StudentCreateAdmin.middleware,createAttendance.middleware),
})