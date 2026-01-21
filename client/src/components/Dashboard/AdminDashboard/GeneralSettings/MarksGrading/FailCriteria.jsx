import React from 'react';
import { TfiReload } from "react-icons/tfi";

const FailCriteria = () => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                    <h1 className="mb-5 text-xl text-gray-500"><span className="font-semibold text-black">Student</span> will be marked as <span className="text-red-400 font-semibold">FAILED</span> in the exams if he or she obtains an <span className="font-semibold text-black">overall percentage</span>   score
                         equal to or below</h1>
                    <div className="relative border border-purpleColor rounded-3xl p-2 col-span-2">
                        <input
                            type="text"
                            placeholder="Example 40"
                            className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none"
                        />
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Overall %
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="mb-12 text-xl text-gray-500"><span className="text-yellow-500 font-semibold">OR</span> he or she obtains a <span className="font-semibold text-black">Subject percentage</span> score equal to or below</h1>
                    <div className="relative border border-purpleColor rounded-3xl p-2 col-span-2">
                        <input
                            type="text"
                            placeholder="Example 33"
                            className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none"
                        />
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Subject %
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="mb-19 text-xl text-gray-500">at least <span className="text-blue-500 font-semibold">in</span> <span className="font-semibold text-black">Subjects</span></h1>
                    <div className="relative border border-purpleColor rounded-3xl p-2 col-span-2">
                        <input
                            type="text"
                            placeholder="Example 1"
                            className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none"
                        />
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            No. of Subjects
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-8 mb-3">
                <button
                    className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer"
                >
                    <TfiReload className="text-xl"/>
                    <span>Update</span>
                </button>
            </div>
        </div>
    );
};

export default FailCriteria;