import React, { useState } from 'react';
import { LuPlus } from "react-icons/lu";
import { HiOutlineMinus } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";

const Inputform = () => {
    const [inputRows, setInputRows] = useState([]);

    const handleAdd = () => {
        setInputRows(prev => [...prev, { subject: '', marks: '' }]);
    };

    const handleRemove = () => {
        if (inputRows.length > 0) {
            setInputRows(prev => prev.slice(0, -1));
        }
    };

    return (
        <div className="mt-8">
            <div className="rounded-3xl border border-gray-300 shadow bg-white p-5">

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-700 flex items-center justify-center mb-3">
                    Create Subjects
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                    <div className="flex items-center space-x-1">
                        <span className="inline-block w-4 h-2 rounded-full bg-purpleColor"></span>
                        <p className="text-sm text-purpleColor font-medium">Required*</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                        <span className="text-sm text-gray-600 font-medium">Optional</span>
                    </div>
                </div>

                {/* Input form */}
                <div className="space-y-8">
                    <div className="relative border border-purpleColor rounded-3xl p-2">
                        <input
                            type="text"
                            placeholder="Selected"
                            className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none"
                        />
                        <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Select Class*
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                        <div className="relative border border-purpleColor rounded-3xl p-2 w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Name of Subject"
                                className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none"
                            />
                            <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                Subject Name*
                            </div>
                        </div>

                        <div className="relative border border-purpleColor rounded-3xl p-2 w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Total Exam Marks"
                                className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none"
                            />
                            <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                Marks*
                            </div>
                        </div>
                    </div>

                    {inputRows.map((_, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-3">
                            <div className="relative border border-purpleColor rounded-3xl p-2 w-full md:w-1/2">
                                <input
                                    type="text"
                                    placeholder="Name of Subject"
                                    className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none"
                                />
                                <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                    Subject Name*
                                </div>
                            </div>

                            <div className="relative border border-purpleColor rounded-3xl p-2 w-full md:w-1/2">
                                <input
                                    type="text"
                                    placeholder="Total Exam Marks"
                                    className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none"
                                />
                                <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                    Marks*
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add & Remove button */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                    <button
                        onClick={handleAdd}
                        className="bg-gray-400 rounded-2xl px-4 py-1 text-white flex items-center gap-2 cursor-pointer"
                    >
                        <LuPlus className="text-xl" />
                        Add More Option
                    </button>

                    <button
                        onClick={handleRemove}
                        className="bg-gray-800 rounded-2xl px-4 py-1 text-white flex items-center gap-2 cursor-pointer"
                    >
                        <HiOutlineMinus className="text-xl" />
                        Remove
                    </button>
                </div>

                {/* button */}
                <div className="flex items-center justify-center mt-8 mb-3">
                    <button
                        className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer"
                    >
                        <FaPlus className="text-xl" />
                        <span>Assign Subjects</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Inputform;
