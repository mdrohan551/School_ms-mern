import {createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../custombaseQureyRefresToken/customBaseQuery.js";


const createAttendance = createApi({
    reducerPath: "Attendance",
    baseQuery: customBaseQuery,
    tagTypes: ['Attendance'],
    endpoints: (builder) => ({

        // create attendance
        CreateAttendance: builder.mutation({
            query: (data) => ({
                url: `/create-attendance`,
                method: "POST",
                body: data
            }),
            invalidateTags: ['Attendance'],
        }),

        // see all item
        GetAllAttendance: builder.query({
            query: ({ classID, date } = {}) => {
                if (classID && date) {
                    return {
                        url: `/fetch-attendances?classID=${classID}&date=${date}`,
                        method: "GET",
                    };
                }
                if (classID) {
                    return {
                        url: `/fetch-attendances?classID=${classID}`,
                        method: "GET",
                    };
                }
                if (date) {
                    return {
                        url: `/fetch-attendances?date=${date}`,
                        method: "GET",
                    };
                }
                return {
                    url: `/fetch-attendances`,
                    method: "GET",
                };
            },
            providesTags: ['Attendance'],
        }),

        // update attendance status
        UpdateAttendance: builder.mutation({
            query: (body) => ({
                url: `/update-attendance`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: (result, error, {id}) => [{type: "Attendance", id}]
        }),

       GetAttendanceSummary:builder.query({
           query:()=>({
               url:"/fetch-summary-attendances",
               method:"GET",
           }),
           providesTags: ['Attendance'],
       })  ,
        TodayAttendanceStudent:builder.query({
           query:()=>({
               url:"/get-Today-Attendance",
               method:"GET",
           }),
           providesTags: ['Attendance'],
       })


    })
})

export const {
    useCreateAttendanceMutation,
    useGetAllAttendanceQuery,
    useUpdateAttendanceMutation,
    useGetAttendanceSummaryQuery,
    useTodayAttendanceStudentQuery,
} = createAttendance;
export default createAttendance;