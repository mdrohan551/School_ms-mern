import React from 'react';
import {TfiPlus} from "react-icons/tfi";

const Accountform = () => {
    return (
        <div className="rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-5 max-w-2xl mx-auto bg-white w-full">

            {/* Header Section */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 flex items-center justify-center mb-3 text-center">
                Add chart of accounts
            </h1>

            <div
                className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                    <span
                        className="inline-block w-4 h-2 rounded-full bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9]"></span>
                    <p className="text-sm text-purpleColor font-medium">Required*</p>
                </div>

                <div className="flex items-center space-x-1">
                    <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                    <span className="text-sm text-gray-600 font-medium">Optional</span>
                </div>
            </div>

            <div className="space-y-6">

                {/* Input Section */}
                <div className="space-y-6">
                    <div className="relative border border-purpleColor rounded-3xl p-2">
                        <input
                            type="text"
                            placeholder="Name Of Head"
                            className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none placeholder:font-semibold"
                        />
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Head name*
                        </div>
                    </div>

                    <div className="relative border border-purpleColor rounded-3xl p-2">
                        <select className="w-full rounded-2xl  px-3 py-1 focus:outline-none border-none pr-8">
                            <option value="">Select</option>
                            <option>Income</option>
                            <option>Expense</option>
                        </select>
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Head type*
                        </div>
                    </div>
                </div>

                {/* button Section */}
                <div className="flex items-center justify-center mt-8 mb-5">
                    <button
                        className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer text-base sm:text-xl">
                        <TfiPlus className="text-lg sm:text-xl"/>
                        <span>Save Head</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Accountform;