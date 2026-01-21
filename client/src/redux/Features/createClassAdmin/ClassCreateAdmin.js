import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../custombaseQureyRefresToken/customBaseQuery.js";
const CreateClassAdmin = createApi({
    reducerPath: "createClassAdmin",
    baseQuery: customBaseQuery,
    tagTypes: ['createClassAdmin'],
    endpoints: (builder) => ({
        CreateClass: builder.mutation({
            query: (formData) => ({
                url: `/create-class`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['createClassAdmin'],
        }),
        UpdateClass: builder.mutation({
            query: ({ UpdateData, id }) => ({
                url: `/update-class/${id}`,
                method: "PUT",
                body: UpdateData,
            }),
            invalidatesTags: ['createClassAdmin'],
        }),
        DeleteClass: builder.mutation({
            query: (id) => ({
                url: `/delete-class/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['createClassAdmin'],
        }),
        AllClasses: builder.query({
            query: ({ page, count } = {})    => {
                const queryParams = new URLSearchParams();

                if (page !== undefined) queryParams.set("page", page);
                if (count !== undefined) queryParams.set("count", count);

                const queryString = queryParams.toString();
                return queryString ? `/fetch-classes?${queryString}` : "/fetch-classes";
            },

            providesTags: (result) =>
                result ?
                    [...result.data.map(({ id }) => ({ type: 'createClassAdmin', id })), 'createClassAdmin']
                    : ['createClassAdmin'],
        }),
        SingleClass: builder.query({
            query: (id) => ({
                url: `/fetch-class/${id}`,
                method: "GET"
            }),
            providesTags: ['createClassAdmin'],
        }),
    })
})
export const {
    useCreateClassMutation,
    useUpdateClassMutation,
    useDeleteClassMutation,
    useAllClassesQuery,
    useSingleClassQuery,
} = CreateClassAdmin;
export default CreateClassAdmin;
