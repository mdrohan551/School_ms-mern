import React from 'react';
import {IoHomeOutline} from "react-icons/io5";
import InputForm from "./inputForm.jsx";
import SearchForm from "./searchForm.jsx";


const GeneralFeesInvoice = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-xl font-medium">General Settings</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-xl"/>
                        <p className="text-xl">- Fee Challan Details</p>
                    </div>
                </div>
            </div>
            <div className="max-w-full mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
                    <div className="lg:col-span-2">
                        <InputForm/>
                    </div>
                    <div className="lg:col-span-3 mr-6">
                        <SearchForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralFeesInvoice;