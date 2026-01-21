import {createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../custombaseQureyRefresToken/customBaseQuery.js";
// to create auth api
const AuthApi = createApi({
    // reducerPath: "AuthServices",
    // baseQuery: fetchBaseQuery({
    //     baseUrl: `${getBaseUrl()}/api/v1`,
    //     credentials: "include"
    // }),

//                ^
//                |
//                |
//     --------------------------------------------
//   🔹 Top Section: Basic baseQuery (Raw Backend API Call ! but comment )
// --------------------------------------------
//   • Direct backend API call using fetchBaseQuery
//   • Browser automatically sends cookies with request
//     • Requires: `credentials: 'include'`
//   • No handling of token expiration
//   • ❌ If access token expires → User sees error and must re-login
// --------------------------------------------
//                  |
//                  |
//                  ↓
// --------------------------------------------
//   🔸 Bottom Section: Advanced customBaseQuery (Token Checker)
// --------------------------------------------
//   • Intercepts requests via custom baseQuery logic
//   • If access token is expired →
// ↳ Automatically uses refresh token to request new access token
//         ↳ Retry the original request with new token
//     • ✅ Smooth user experience — No error shown
//   • ✅ No forced logout or re-login after token expiry (e.g., after 5 mins)
// --------------------------------------------
//                  |
//                  |
//                  ↓
// --------------------------------------------
    reducerPath: "AuthServices",
    baseQuery: customBaseQuery,
    tagTypes: ["Users"],

    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/school-signUp",
                method: "POST",
                body: newUser,
            })
        }),
        loginUser: builder.mutation({
            query: (userAuthData) => ({
                url: "/login",
                method: "POST",
                body: userAuthData,

            }),

        }),

        logoutUser:builder.mutation({
            query:()=>({
                url:"/logout",
                method:"POST",
            })
        }),


        getRole:builder.mutation({
            query: (userLockId) => ({
                url:`/auth/userRole/${userLockId}`,
                method: "POST",

            })
        })

    })


});


export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    // role checker
    useGetRoleMutation,
} = AuthApi;


export default AuthApi;