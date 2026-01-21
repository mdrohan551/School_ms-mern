import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseUrl} from "../../BaseUrl/BaseUrl.js";
import toast from "react-hot-toast";
import {Logout} from "../slice/authSlice.js";


const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1`,
    credentials: "include" // automatically sends cookies (like HttpOnly access/refresh token)
})


const customBaseQuery = async (
    // recevie params
    requestConfig,        // 🟦 args → request configuration (url, method, body, etc.)
    apiToolkitHelpers,    // 🟩 api → RTK helpers (dispatch, getState, etc.)
    fetchOptions          // 🟨 extraOptions → additional fetch options (rarely used)
) => {


    // first attempt to call api
    let result = await baseQuery(requestConfig, apiToolkitHelpers, fetchOptions);
    // 🔒 If access token expired (401 error)
    if (result?.error?.status === 401) {
        toast.loading('access token expired. trying to refresh');


        // ⏳ Try to refresh the token using refresh token
        const refreshResult = await baseQuery('/refresh-token', apiToolkitHelpers, fetchOptions)
        if (refreshResult?.data?.status === true) {
            toast.dismiss();
            result = await baseQuery(requestConfig, apiToolkitHelpers, fetchOptions)
        } else {
            toast.dismiss();
            toast.error('You Are Unauthorized Please try again later.');
            apiToolkitHelpers.dispatch(Logout())
            // 🔴 Optional: redirect
            window.location.href = "/login";
        }
    }
     return result
}

export default customBaseQuery;