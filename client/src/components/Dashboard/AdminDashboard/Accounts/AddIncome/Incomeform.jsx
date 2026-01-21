import React from 'react';
import { Plus } from 'lucide-react';

const Incomeform = () => {
    return (
        <div className="mt-15">
            <div className="p-5 rounded-2xl border border-gray-300 shadow-md bg-white">
                <h1 className="text-3xl font-bold text-gray-700 flex items-center justify-center mb-3">
                    Add income</h1>
                <div className="flex items-center justify-center space-x-4 mb-6">

                    <div className="flex items-center space-x-1">
                        <span className="inline-block w-4 h-2 rounded-full bg-purpleColor"></span>
                        <p className="text-sm text-purpleColor font-medium">Required*</p>
                    </div>


                    <div className="flex items-center space-x-1">
                        <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                        <span className="text-sm text-gray-600 font-medium">Optional</span>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="relative  border border-purpleColor rounded-3xl p-2 ">
                        <input
                            type="date"
                            placeholder=""
                            className="w-full rounded-2xl  px-3 py-1 focus:outline-none border-none"/>
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Date*
                        </div>
                    </div>

                    <div className="relative  border border-purpleColor rounded-3xl p-2 ">
                        <input
                            type="text"
                            placeholder="Income Description"
                            className="w-full rounded-2xl  px-3 py-1 focus:outline-none border-none"/>
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Description*
                        </div>
                    </div>

                    <div className="relative  border border-purpleColor rounded-3xl p-2 ">
                        <input
                            type="text"
                            placeholder="Income Amount*"
                            className="w-full rounded-2xl  px-3 py-1 focus:outline-none border-none"/>
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Amount*
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-8">
                    <button
                        className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">
                        <Plus className="text-base"/>
                        <span>Add Income</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Incomeform;