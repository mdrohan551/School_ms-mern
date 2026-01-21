import {createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../../custombaseQureyRefresToken/customBaseQuery.js";


const StudentCreateAdmin = createApi({
     reducerPath: 'studentCreateAdmin',
     baseQuery:customBaseQuery,
    tagTypes:['studentCreateAdmin'],
    endpoints:(builder)=>({

// get all student



        GetAllStudents:builder.query({
            query:({page,count}={}) =>{
                const queryParams = new URLSearchParams();
                if(page !== undefined) queryParams.set("page", page);
                if(count !== undefined) queryParams.set("count", count);
                const queryString = queryParams.toString();
                return queryString ? `/fetch-students?${queryString}` : "fetch-students"
            },
            providesTags: (result) =>
                result ?
                    [...result.data.map(({ id }) => ({ type: 'studentCreateAdmin', id })), 'studentCreateAdmin']
                    : ['studentCreateAdmin'],
        }),






        // get single student

        SingleStudent:builder.query({
            query:(id)=>({
                url:`/fetch-student/${id}`,
                method:"GET",
            }),
            providesTags:['studentCreateAdmin'],
        }),

        CreateStudent:builder.mutation({
            query:(formData)=>({
                url:`/create-student`,
                method:"POST",
                body:formData
            }),
            invalidatesTags: ['studentCreateAdmin', 'createClassAdmin'], // ✅ এখানে যোগ করো
        }),
        UpdateStudent:builder.mutation({
            query:({formData,id})=>({
                url:`/update-student/${id}`,
                method:"PUT",
                body:formData
            }),
            invalidatesTags: ['studentCreateAdmin', 'createClassAdmin'], // ✅ এখানে যোগ করো
        }),
        DeleteStudent:builder.mutation({
            query:(id)=>({
                url:`/delete-student/${id}`,
                method:"DELETE",

            }),
            invalidatesTags: ['studentCreateAdmin', 'createClassAdmin'], // ✅ এখানে যোগ করো
        }),




       
    })

})



export const {
    useGetAllStudentsQuery,
    useSingleStudentQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
} = StudentCreateAdmin;
export default StudentCreateAdmin