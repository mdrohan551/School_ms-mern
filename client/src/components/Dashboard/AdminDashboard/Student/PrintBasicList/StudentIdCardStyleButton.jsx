import React, {useState} from 'react';
import FormSection from "./formSection.jsx";
import {
    useGetAllStudentsQuery,

} from "../../../../../redux/Features/StudentCreateAdmin/StudentCreateAdmin.js";
import {
    useAllClassesQuery,
    useSingleClassQuery
} from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";


const StudentIdCardStyleButton = () => {
    const [classId, setClassId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalStable] = useState(5)
    const {data=[], isLoading} = useGetAllStudentsQuery({page:currentPage,count:totalStable});
    const {data: allClasses} = useAllClassesQuery();
    const { data: singeClass = {}, isLoading: singClassLoading } = useSingleClassQuery(classId, {
        skip: !classId,
    });
    const changeClassID = (e)=>{
        setClassId(e.target.value);
    }
    const {
        total = 0,
        totalPages = 6,
    } = data?.meta || {};
    const students = classId ? (singeClass?.data?.students || []) : (data?.data || []);
    const [searchTerm, setSearchTerm] = useState("");
    // total showing system
    const startStudent = data?.data?.length > 0 ? (currentPage - 1) * totalStable + 1 : 0;
    const endStudent = data?.data?.length > 0 ? startStudent +  data?.data?.length - 1 : 0;
   // show hide pagination condition
    const isSingleClass = !!classId;

    if (isLoading) {
        return <div className="text-center py-10 text-lg font-semibold">Loading student data...</div>;
    }
    return (
        <div className="px-10 py-10">


            <div className="flex flex-wrap  justify-between items-center  mt-8 w-full">
                {/* Class Selection */}
                <div className="relative border border-purpleColor rounded-3xl p-2 w-full sm:w-1/4 ">
                    <select
                        value={classId || ""}
                        onChange={changeClassID}
                        className="w-full bg-transparent text-gray-700 focus:outline-none px-5"
                    >
                        <option value="" >Select and get class</option>
                        {
                            allClasses?.data?.map((student) => (
                                <option key={student?._id} value={student?._id}>{student.name}</option>
                            ))
                        }
                    </select>

                    {/* Floating label */}
                    <div
                        className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Select Class*
                    </div>

                </div>
                {/* Search Field */}
                <div className="space-x-2 w-full sm:w-auto">
                    <label htmlFor="search" className="text-xl">Search :</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border placeholder:text-gray-400 border-gray-500 rounded-3xl px-3 py-2 focus:outline-none w-full sm:w-auto"
                    />
                </div>
            </div>

            {/* Button and Search Section */}
            <div
                className="shadow rounded-3xl  lg:flex-row items-start lg:items-center justify-between space-y-3 lg:space-y-0 lg:space-x-5 mt-8 ">


                {/* Form Section with props */}
                <FormSection students={students} searchTerm={searchTerm} allClasses={allClasses} isLoading={isLoading || singClassLoading} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}   showPagination={!isSingleClass} startStudent={startStudent} endStudent={endStudent} total={total}/>


            </div>
        </div>
    );
};

export default StudentIdCardStyleButton;
