import React, { useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";
import {
    useGetAllEmployeesQuery,
    useSearchEmployeesQuery
} from "../../../../../redux/Features/EmployeeCreateAdmin/EmployeeCreateAdmin.js";
import Loader from "../../../../../Loader/Loader.jsx";
import {RotateCcw} from "lucide-react";
import toast from "react-hot-toast";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import JobLetterCard from "./JobLetterCard.jsx";
import {useGetSchoolSingleDetailsQuery} from "../../../../../redux/Features/SchoolAdmin/GeneralSettingsApi.js";
import DataEmpty from "../../../../dataNotFound/DataEmpty.jsx";

const JobLetter = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchText, setSearchText] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const {
        data: allEmployee,
        isLoading: employeLoading,
        error: employeeError,
    } = useGetAllEmployeesQuery();

    const {
        data: searchEmployee,
        isLoading: searchLoader,
        error: searchError,
    } = useSearchEmployeesQuery(searchQuery, {
        skip: !searchQuery
    });
    const {data,isLoading:detailloading,error,refetch} = useGetSchoolSingleDetailsQuery()
    useEffect(() => {
        if (searchError) {
            toast.error('Employee not found');
            setSearchQuery('');
            setSearchText('');
            setShowSuggestions(false);
            refetch()
        }
    }, [searchError]);

    useEffect(() => {
        if (searchText === "") setShowSuggestions(false);
    }, [searchText]);

    const isSearching = typeof searchQuery === "string" && searchQuery.trim() !== "";
    const allEmployeesData = isSearching
        ? searchEmployee?.data ?? []
        : allEmployee?.data ?? [];

    const filteredSuggestions = allEmployee?.data?.filter((emp) =>
        emp.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSuggestionClick = (employee) => {
        const searchValue = employee.email || employee.name;
        setSearchText(searchValue);
        setSearchQuery(searchValue.toLowerCase());
        setShowSuggestions(false);
    };

    const handleSearch = () => {
        const input = searchText.trim().toLowerCase();
        if (input) {
            setSearchQuery(input);
            setShowSuggestions(false);
        }
    };

    if (isSearching && searchLoader) return <Loader />;
    if (!isSearching && employeLoading) return <Loader />;

    return (
        <div className="p-4 space-y-6">
            {/* 👉 Search Section */}
            <div className="flex flex-col items-center relative w-full max-w-md mx-auto">
                <div className="flex w-full mb-5">
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSearchText("");
                            setShowSuggestions(false);
                        }}
                        className="flex gap-2 bg-blue-800 text-white items-center px-2 mr-5 rounded-2xl cursor-pointer"
                    >
                        <RotateCcw /> Refresh
                    </button>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="border w-full px-4 py-2 rounded-l-lg focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                    >
                        <GoSearch />
                    </button>
                </div>

                {/* 🔽 Suggestions */}
                {searchText && showSuggestions && (
                    <div className="absolute top-full mt-1 z-10 w-full bg-white dark:bg-blue-950 border shadow-md rounded-xl max-h-60 overflow-auto">
                        {filteredSuggestions?.length ? (
                            filteredSuggestions.map((emp, i) => (
                                <div
                                    key={i}
                                    className="px-4 py-2 hover:bg-blue-100 hover:text-black cursor-pointer"
                                    onClick={() => handleSuggestionClick(emp)}
                                >
                                    <p className="text-sm font-medium">{emp.name}</p>
                                    <p className="text-xs text-gray-500">{emp.email}</p>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-500">No employee found</div>
                        )}
                    </div>
                )}
            </div>

            {/* 👉 Employee Cards in DetailsEmp style */}
            <div className="grid grid-cols-1 gap-5">
                {allEmployeesData?.length > 0 ? allEmployeesData.map((emp) => (
                    <JobLetterCard key={emp._id} emp={emp} data={data?.data || []} />

                )) : <DataEmpty text='Job' />}


            </div>
        </div>
    );
};

export default JobLetter;
