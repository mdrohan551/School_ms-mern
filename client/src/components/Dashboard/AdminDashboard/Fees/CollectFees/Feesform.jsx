import React, {useState} from 'react';
import Familywise from "./familywise.jsx";
import PaidInvoice from "./paidInvoice.jsx";
import StudentWise from "./studentWise.jsx";

const Feesform = () => {

    const [Select,setSelect] = useState("Student Wise")

    return (
        <div className="mt-10 relative  mx-auto">

            {/* Floating Header Label */}
            <div className="absolute -top-5 left-1/3 -translate-x-1/2 flex gap-4 z-10">
                <button
                    onClick={(e)=>setSelect(e.target.value)}
                    value="Student Wise"
                    className={`bg-white px-4 py-1 text-sm font-medium  border border-blue-300 rounded-md shadow-sm flex items-center gap-2 cursor-pointer ${Select === "Student Wise" ? "bg-white text-blue-600 font-semibold" : "bg-gray-200 "}`}
                >
                    Student Wise
                </button>
                <button
                    onClick={(e)=>setSelect(e.target.value)}
                    value="Class Wise"
                    className={`bg-white px-4 py-1 text-sm font-medium  border border-blue-300 rounded-md shadow-sm flex items-center gap-2 cursor-pointer ${Select === "Class Wise" ? "bg-white text-blue-600 font-semibold" : "bg-gray-200 "}`}
                >
                    Family Wise
                </button>
                <button
                    onClick={(e)=>setSelect(e.target.value)}
                    value="Scanning Paid"
                    className={`bg-white px-4 py-1 text-sm font-medium  border border-blue-300 rounded-md shadow-sm flex items-center gap-2 cursor-pointer ${Select === "Scanning Paid" ? "bg-white text-blue-600 font-semibold" : "bg-gray-200 "}`}
                >
                    Scanning Paid Invoices
                </button>
            </div>


            {
                Select === "Student Wise" ? (
                    <StudentWise />
                ) : Select === "Class Wise" ? (
                    <Familywise />
                ) : Select === "Scanning Paid" ? (
                    <PaidInvoice />
                ) : null
            }

        </div>
    );
};

export default Feesform;