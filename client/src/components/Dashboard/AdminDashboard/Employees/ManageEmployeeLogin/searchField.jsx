import React from 'react';
import {IoIosSearch} from "react-icons/io";

const SearchField = () => {
    return (
        <div className="w-full mt-4 px-4">
            <div className="rounded-2xl shadow bg-white p-4 sm:p-5 h-full">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
                    <IoIosSearch className="text-3xl"/>
                    <h1 className="font-semibold text-xl sm:text-2xl">Search</h1>
                </div>
                <div className="flex justify-center mt-9">
                    <div className="space-y-7 w-full max-w-md">
                        <div className="relative border border-purpleColor rounded-3xl p-2">
                            <input
                                type="text"
                                placeholder="Search Student"
                                className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none"
                            />
                            <div
                                className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                Search Student*
                            </div>
                        </div>
                        <div className="relative border border-purpleColor rounded-3xl p-2">
                            <input
                                type="text"
                                placeholder="Selected"
                                className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none"
                            />
                            <div
                                className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                                Select Class*
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-wrap items-center justify-center gap-2 mt-7 text-gray-400 font-bold cursor-pointer">
                    <h1 className="border-b">or</h1><span>,</span>
                    <h1 className="border-b">Reload All</h1>
                </div>
            </div>
        </div>
    );
};

export default SearchField;