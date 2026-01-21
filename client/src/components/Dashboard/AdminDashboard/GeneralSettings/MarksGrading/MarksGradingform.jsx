import React, { useState } from 'react';
import { IoCheckmark } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { HiOutlineMinus } from "react-icons/hi2";

const MarksGradingform = () => {

    const [inputRows, setInputRows] = useState(
        Array.from({ length: 7 }, () => ({ grade: "", from: "", upto: "", status: "" }))
    );

    const handleAdd = () => {
        setInputRows([...inputRows, { grade: "", from: "", upto: "", status: "" }]);
    };

    const handleRemove = () => {
        if (inputRows.length > 1) {
            setInputRows(prev => prev.slice(0, -1));
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-col gap-4">

                {inputRows.map((row, index) => (

                    <div key={index} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                        {/* Grade */}
                        <div className="relative border border-purpleColor rounded-3xl p-2 col-span-2">
                            <input
                                type="text"
                                className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none"
                                value={row.grade}
                                onChange={(e) => {
                                    const updated = [...inputRows];
                                    updated[index].grade = e.target.value;
                                    setInputRows(updated);
                                }}
                            />
                            <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                Grade*
                            </div>
                        </div>

                        {/* % From */}
                        <div className="relative border border-purpleColor rounded-3xl p-2 col-span-1">
                            <input
                                type="number"
                                className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none"
                                value={row.from}
                                onChange={(e) => {
                                    const updated = [...inputRows];
                                    updated[index].from = e.target.value;
                                    setInputRows(updated);
                                }}
                            />
                            <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                % From*
                            </div>
                        </div>

                        {/* % Upto */}
                        <div className="relative border border-purpleColor rounded-3xl p-2 col-span-1">
                            <input
                                type="number"
                                className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none"
                                value={row.upto}
                                onChange={(e) => {
                                    const updated = [...inputRows];
                                    updated[index].upto = e.target.value;
                                    setInputRows(updated);
                                }}
                            />
                            <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                % Upto*
                            </div>
                        </div>

                        {/* Status */}
                        <div className="relative border border-purpleColor rounded-3xl p-2 col-span-2">
                            <input
                                type="text"
                                className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none"
                                value={row.status}
                                onChange={(e) => {
                                    const updated = [...inputRows];
                                    updated[index].status = e.target.value;
                                    setInputRows(updated);
                                }}
                            />
                            <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                Status*
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3 mt-5">
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

            {/* Save Button */}
            <div className="flex items-center justify-center mt-8 mb-3">
                <button
                    className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer"
                >
                    <IoCheckmark className="text-xl" />
                    <span>Save Changes</span>
                </button>
            </div>
        </div>
    );
};

export default MarksGradingform;
