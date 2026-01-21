import {createApi} from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../custombaseQureyRefresToken/customBaseQuery.js";


const EmployeeCreateAdmin = createApi({
    reducerPath: "EmployeeCreateAdmin",
    baseQuery:customBaseQuery,
    tagTypes: ['EmployeeCreateAdmin'],
    endpoints: (builder) => ({
        CreateEmployee: builder.mutation({
            query: (formData) => ({
                url: `/create-employee`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["EmployeeCreateAdmin"],
        }),

        getAllEmployees: builder.query({
            query: () => ({
                url: '/fetch-employees',
                method: "GET"
            }),
            providesTags: ["EmployeeCreateAdmin"],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/delete-employee/${id}`,
                method: "DELETE"
            }),
            // invalidatesTags: ["EmployeeDeleteAdmin"],
            // same work
            invalidatesTags: (result, error, id) => [{type: 'EmployeeCreateAdmin', id}, {
                type: 'EmployeeCreateAdmin',
                id: 'LIST'
            }]

        }),
        UpdateEmployee: builder.mutation({
            query: ({UpdateData,id}) => ({
                url: `/update-employee/${id}`,
                method: "PUT",
                body: UpdateData
            }),
            invalidatesTags: ["EmployeeCreateAdmin"],
        }),
        employeeDetails: builder.query({
            query: (id) => ({
                url: `/fetch-employee/${id}`,
                method: "GET"
            }),
            providesTags: ["EmployeeCreateAdmin"],
        }),
        searchEmployees: builder.query({
            query: (input) => {
                const isEmail = input.includes('@'); // simple check
                const queryParams = new URLSearchParams();

                if (isEmail) {
                    queryParams.append('email', input);
                } else {
                    queryParams.append('name', input);
                }

                return `/search-employee?${queryParams.toString()}`;
            },
            providesTags: ["EmployeeSearchAdmin"],
        })

    })


})


export const {
    useCreateEmployeeMutation,
    useGetAllEmployeesQuery,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
    useEmployeeDetailsQuery,
    useSearchEmployeesQuery,
} = EmployeeCreateAdmin;


export default EmployeeCreateAdmin;