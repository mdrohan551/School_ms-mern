import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import Form from "./form.jsx";

const FeesParticuler = () => {
    return (
        <div>
            <div className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-xl font-medium">Settings</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-xl" />
                        <p className="text-xl">- Change Fee Particulars</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button className="bg-black text-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2">
                        <TfiReload className="text-base" />
                        <span className="text-sm">Reset To Default</span>
                    </button>
                    <button className="bg-teal-bright px-4 py-2 rounded-full text-white">?</button>
                </div>
            </div>
            <div className="max-w-full mx-auto">
                <Form />
            </div>
        </div>
    );
};

export default FeesParticuler;
