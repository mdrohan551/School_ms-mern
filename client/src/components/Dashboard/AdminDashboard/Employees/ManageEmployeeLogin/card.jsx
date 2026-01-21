import React, {useState} from 'react';
import {FiChevronDown} from "react-icons/fi";
import EmploycardData from "./EmploycardData.jsx";
import {Data} from "../../../../../constant/EmployloginData.js";

const Card = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Column Visibility");

    const handleSelect = (item) => {
        setSelected(item);
        setIsOpen(false);
    };

    return (
        <div>
            <div
                className="shadow rounded-3xl p-5 lg:flex-row items-start lg:items-center justify-between space-y-3 lg:space-y-0 lg:space-x-5 mt-4 bg-white">
                <div
                    className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-3 sm:gap-6 w-full">
                    <div className="flex flex-wrap items-center gap-3 ml-4">
                        <button
                            className="flex items-center px-4 py-2.5 bg-[#5E5E5E] rounded-full gap-2 hover:bg-blue-800 text-white cursor-pointer w-full sm:w-auto"
                        >
                            <span>Copy</span>
                        </button>

                        <button
                            className="flex items-center px-4 py-2.5 bg-[#5E5E5E] rounded-full gap-2 hover:bg-blue-800 text-white cursor-pointer w-full sm:w-auto"
                        >
                            <span>CSV</span>
                        </button>

                        <button
                            className="flex items-center px-4 py-2.5 bg-[#5E5E5E] rounded-full gap-2 hover:bg-blue-800 text-white cursor-pointer w-full sm:w-auto"
                        >
                            <span>Excel</span>
                        </button>

                        <button
                            className="flex items-center px-4 py-2.5 bg-[#5E5E5E] rounded-full gap-2 hover:bg-blue-800 text-white cursor-pointer w-full sm:w-auto"
                        >
                            <span>PDF</span>
                        </button>

                        <button
                            className="flex items-center px-4 py-2.5 bg-[#5E5E5E] rounded-full gap-2 hover:bg-blue-800 text-white cursor-pointer w-full sm:w-auto"
                        >
                            <span>Print</span>
                        </button>

                        <div className="relative w-full sm:w-auto">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-full rounded-full bg-[#5E5E5E] text-white px-4 py-2.5 text-left hover:bg-blue-800 cursor-pointer flex items-center justify-between"
                            >
                                <span>{selected}</span>
                                <FiChevronDown
                                    className={`ml-2 text-white transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {isOpen && (
                                <div className="absolute mt-2 w-full rounded-xl bg-white shadow-lg z-10">
                                    {Data.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSelect(item)}
                                            className="px-4 py-2 text-center text-white bg-gray-300 font-medium shadow rounded-full my-1 mx-2 cursor-pointer border border-blue-400 hover:bg-blue-500"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-x-2">
                        <label htmlFor="search" className="text-xl">Search :</label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-500 rounded-3xl px-3 py-2 focus:outline-none w-full sm:w-auto"
                        />
                    </div>
                </div>
                <div>
                    <EmploycardData/>
                </div>
            </div>
        </div>
    );
};

export default Card;