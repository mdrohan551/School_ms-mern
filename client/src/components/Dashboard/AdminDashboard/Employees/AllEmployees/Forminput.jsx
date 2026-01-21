import React, {useState, useEffect} from "react";
import {RefreshCw, UserPlus, Search, FilePenLine, Trash2, X, AlertTriangle, RotateCcw} from "lucide-react";
import {Link} from "react-router-dom";
import Loader from "../../../../../Loader/Loader.jsx";
import NotfoundPage from "../../../../ErrorPage/NotfoundPage.jsx";
import toast from "react-hot-toast";
import Modal from "../Modal.jsx";
import AleartModal from "../AleartModal.jsx";
import DataEmpty from "../../../../dataNotFound/DataEmpty.jsx";
import {IoHomeOutline} from "react-icons/io5";
import {TfiReload} from "react-icons/tfi";

const Forminput = ({
                       allEmployee,
                       employeLoading,
                       employeeError,
                       searchEmployee,
                       searchLoader,
                       searchError,
                       setSearchQuery,
                       searchQuery,
                       DeleteEmp,
                       DeleteEmpLoading,
                       DeleteEmpError,
                       refetch
                   }) => {
    const [searchText, setSearchText] = useState("");

    const [showSuggestions, setShowSuggestions] = useState(false);

    const [deleteAlertId, setDeleteAlertId] = useState(false);


    const [employeeId, setEmployeeId] = useState('');
    // modal show state
    const [showModal, setshowModal] = useState(false);
    useEffect(() => {
        if (searchText === "") {
            setShowSuggestions(false);
        }
    }, [searchText]);


    if (allEmployee) {
        if (employeLoading) return <Loader/>;
        if (employeeError) return <NotfoundPage/>;
    } else {
        if (searchLoader) return <Loader/>;
        if (searchError) return <NotfoundPage/>;
    }


    const filteredSuggestions = allEmployee?.data?.filter((emp) =>
        emp.email?.toLowerCase().includes(searchText.toLowerCase()),
    );


    const isSearching = searchQuery.trim() !== "";

    const allEmployeesData = isSearching ? searchEmployee?.data ?? [] : allEmployee?.data ?? [];


    const handleSuggestionClick = (employee) => {
        setSearchText(employee.email);
        setShowSuggestions(false);
    };

    const handleSearchButtonClick = () => {
        setShowSuggestions(false); // Only hide suggestions
        setSearchQuery(searchText.trim().toLowerCase());

    };

    const HandledeleteEmployee = async (id) => {
        try {
            const res = await DeleteEmp(id).unwrap(); // unwrap দিলে direct data পাবো
            if (res?.status === false) {
                toast.error(res.message);
                refetch()

            } else {
                toast.success(res.message);
                refetch()
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Something went wrong");
        }
    };


    const AddButton = ({label = "Add New", to = "/dashboard/add-teacher"}) => (
        <Link to={to}>
            <div
                className=" px-4 flex py-3 items-center  cursor-pointer
                    ring-1 ring-gray-300 dark:ring-purple-500 rounded-xl
                    bg-white dark:bg-gray-400/20 transition hover:bg-blue-50 gap-2 dark:hover:bg-gray-500/20"
            >
                <UserPlus className="text-blue-700 dark:text-gray-300 w-6 h-6 md:w-5 md:h-5"/>
                <span className="hidden sm:block md:text-md text-blue-800 dark:text-gray-300 font-medium ">
                    {label}
                </span>
            </div>
        </Link>
    );


    return (
     <>

         <Modal isOpen={showModal} onClose={()=>setshowModal(false)} empId={employeeId} />
         <div className="mt-9 w-full space-y-6">
             <div
                 className="max-w-full mx-auto shadow rounded-xl p-3  flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white dark:bg-gray-400/20">
                 <AddButton/>
                 <div className="flex items-start sm:items-center gap-4 sm:gap-6">

                     <h1 className="text-sm sm:text-xl font-medium">Employees</h1>
                     <div className="flex items-center justify-center space-x-2">
                         <IoHomeOutline className="text-xl"/>
                         <p className="text-sm sm:text-sm">- All Employees  <span className=" p-1 bg-gray-200 dark:bg-gray-400 rounded-full "> {` ${allEmployee?.data?.length}`}</span> </p>
                     </div>
                 </div>
                 {/* 👉 Top Search Bar */}
                 <div className="flex gap-3 justify-between">



                     <div className="flex flex-col justify-center gap-1 relative">
                         <div className="flex ">
                             <div className="flex gap-2">
                                 <div
                                     className="relative border placeholder:text-gray-400 border-gray-300 dark:border-gray-600   rounded w-50 sm:w-100">
                                     <input
                                         type="text"
                                         placeholder="Search Employee"
                                         className="w-full relative rounded-2xl text-[0.7rem] sm:text-[0.9rem]  px-3 py-2 focus:outline-none border-none dark:placeholder:text-gray-300"
                                         value={searchText}
                                         onChange={(e) => {
                                             setSearchText(e.target.value);
                                             setShowSuggestions(true);
                                         }}
                                         onFocus={() => setShowSuggestions(true)}
                                     />
                                     {
                                         searchText.trim() !== "" && showSuggestions && (
                                             <div onClick={() => (setSearchText(""))}
                                                  className="absolute right-0 top-2 cursor-pointer">
                                                 <X/>
                                             </div>
                                         )
                                     }


                                 </div>
                                 <button
                                     onClick={handleSearchButtonClick}
                                     className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium flex items-center justify-center gap-2"
                                 >
                                     <Search className="w-5 h-5"/>
                                     <span className="hidden sm:block ">{searchLoader ? "searching..." : "Search"}</span>
                                 </button>
                             </div>

                             <button
                                 onClick={() => {
                                     setSearchQuery(""); // Clear query
                                     setSearchText(""); // Clear input box
                                     setShowSuggestions(false); // Hide suggestions
                                     toast.success("Refreshed!");
                                 }}
                                 className="px-4 py-2 bg-blue-400 text-white rounded-md flex ml-4 items-center justify-center"
                                 title="Refresh"
                             >
                                 <TfiReload className="text-xl" />
                             </button>

                         </div>

                         {/* Suggestions Dropdown */}
                         {searchText && showSuggestions && (
                             <div
                                 className="absolute top-full mt-1 z-10 bg-white dark:bg-gray-800 border shadow rounded-xl  max-h-60 overflow-auto">
                                 {filteredSuggestions?.length ? (
                                     filteredSuggestions.map((emp, i) => (
                                         <div
                                             key={i}
                                             className="px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer"
                                             onClick={() => handleSuggestionClick(emp)}
                                         >
                                             <p className="text-[0.8rem]">{emp?.email}</p>
                                         </div>
                                     ))
                                 ) : (
                                     <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                                         No employee found
                                     </div>
                                 )}
                             </div>
                         )}
                     </div>
                 </div>
             </div>


             {/* 👉 Cards Section */}
             {
                 allEmployeesData.length > 0 ?(
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                         {allEmployeesData.map((item, index) => (
                             <div
                                 key={index}
                                 className="card shadow-lg bg-white rounded-xl dark:bg-transparent flex flex-col items-center
                        dark:ring-purple-600 dark:ring-1 px-4 py-4 relative overflow-hidden "
                             >
                                 <img
                                     src={item?.image ? item?.image : "/images/no-image.png"}
                                     className="w-20 h-20 ring-2 dark:ring-white ring-gray-900   rounded-full  "
                                     alt="profile img"
                                 />
                                 <h3 className="text-lg font-semibold mt-2">{item?.name}</h3>
                                 <ul className="flex pt-4 gap-5">
                                     <li className="group relative">
                                         <Link to={`/dashboard/employee-details/${item._id}`}>
                                             <Search className="w-4 sm:w-5"/>
                                         </Link>
                                         <div
                                             className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                             View Details
                                         </div>
                                     </li>
                                     <li className="group relative">
                                         <button onClick={()=>{
                                             setshowModal(true)
                                             setEmployeeId(item._id)
                                         }}>
                                             <FilePenLine className="w-4 sm:w-5"/>
                                         </button>
                                         <div
                                             className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                             Edit
                                         </div>
                                     </li>
                                     <li className="group relative">
                                         {DeleteEmpLoading ? (
                                             <Loader/>
                                         ) : (
                                             <Trash2
                                                 className="w-4 sm:w-5 cursor-pointer text-red-600 hover:text-red-800"
                                                 onClick={() => setDeleteAlertId(item._id)}
                                             />
                                         )}
                                         <div
                                             className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap"
                                         >
                                             Delete
                                         </div>
                                     </li>

                                 </ul>

                                 {deleteAlertId === item._id && (
                                     <AleartModal
                                         HandleDelete={() => HandledeleteEmployee(item._id)}
                                         setDeleteAlertId={setDeleteAlertId}
                                     />
                                 )}

                             </div>
                         ))}


                     </div>
                 ):<DataEmpty text="Employee"/>
             }
         </div>


     </>
    );
};

export default Forminput;
