import {createApi} from "@reduxjs/toolkit/query/react";

import customBaseQuery from "../../custombaseQureyRefresToken/customBaseQuery.js";


const GeneralSettingApi = createApi({
    reducerPath: "generalSettingApi",
    baseQuery: customBaseQuery,
    tagTypes: ['generalSettings'],
    endpoints: (builder) => ({
        updateSchool: builder.mutation({
            query: (data) => ({
                url: '/update-school',
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, {id}) => [{type: "generalSettings", id}],
        }),
        getSchoolSingleDetails:builder.query({
            query: () => ({
                url:'/fetch-school',
                method: "GET",

            }),
            providesTags:['generalSettings']
        }),



        AcademicYear:builder.mutation({
            query: (data) => ({
                url:'/create-academic-year',
                method:"POST",
                body:data,
            }),
            invalidatesTags: (result, error, {id}) => [{type: "generalSettings", id}],
        }),
        AcademicYearUpdate:builder.mutation({
            query: (data) => ({
                url:`/update-academic-year/${data.id}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags: (result, error, {id}) => [{type: "generalSettings", id}],
        }),
        DeleteAcademicYear:builder.mutation({
            query: (id) => ({
                url:`/delete-academic-year/${id}`,
                method:"DELETE",

            }),
            invalidatesTags: (result, error, {id}) => [{type: "generalSettings", id}],
        }),

        AllAcademicYear:builder.query({
            query:()=>({
                url:'/fetch-academic-years',
                method:"GET",
            }),
            providesTags:['generalSettings']
        })


    })


})


export const {
    useUpdateSchoolMutation,
    useGetSchoolSingleDetailsQuery,
    useAcademicYearMutation,
    useAcademicYearUpdateMutation,
    useDeleteAcademicYearMutation,
    useAllAcademicYearQuery,
} = GeneralSettingApi;

export default GeneralSettingApi;