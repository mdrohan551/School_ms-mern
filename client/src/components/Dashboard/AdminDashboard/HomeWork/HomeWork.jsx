import React from 'react';
import {IoHomeOutline} from "react-icons/io5";
import { Plus } from 'lucide-react';
import InputForm from "./InputForm.jsx";

const HomeWork = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-xl font-medium">Homework</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-xl"/> {/* Reduced size */}
                        <p className="text-xl">- Homework</p>
                    </div>
                </div>
                    <button
                        className="bg-[#5C9EFF] text-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer">
                        <Plus className="text-sm"/>
                        <span className="text-sm">Add Homework</span>
                    </button>
            </div>
            <div className="max-w-full mx-auto">
                <InputForm/>
            </div>
        </div>
    );
};

export default HomeWork;