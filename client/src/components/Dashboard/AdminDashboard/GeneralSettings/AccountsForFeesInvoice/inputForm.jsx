import React from 'react';
import { AiOutlinePicture } from "react-icons/ai";
import { TfiPlus } from "react-icons/tfi";

const InputForm = () => {
    return (
        <div className="rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-5 max-w-2xl mx-auto bg-white w-full">

            {/* Header Section */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 flex items-center justify-center mb-3 text-center">
                Add New Bank
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                    <span className="inline-block w-4 h-2 rounded-full bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9]"></span>
                    <p className="text-sm text-purpleColor font-medium">Required*</p>
                </div>

                <div className="flex items-center space-x-1">
                    <span className="inline-block w-4 h-2 rounded-full bg-gray-400"></span>
                    <span className="text-sm text-gray-600 font-medium">Optional</span>
                </div>
            </div>

            <div className="space-y-6">
                {/* Institute Logo */}
                <div className="relative border border-purpleColor rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 min-h-[140px]">
                    <img src="/images/no-image.jpg" alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full" />

                    <label htmlFor="logo-upload"
                           className="bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm hover:bg-purple-600 transition cursor-pointer flex items-center gap-2 w-fit">
                        <AiOutlinePicture className="text-lg" />
                        Change Logo
                    </label>
                    <input id="logo-upload" type="file" className="hidden" />

                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Institute Logo*
                    </div>
                </div>

                {/* Input Section */}
                <div className="space-y-6">
                    <div className="relative border border-purpleColor rounded-3xl p-2">
                        <input
                            type="text"
                            placeholder="Your Bank Name"
                            className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none placeholder:font-semibold"
                        />
                        <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Bank Name*
                        </div>
                    </div>

                    <div className="relative border border-purpleColor rounded-3xl p-2">
                        <input
                            type="text"
                            placeholder=" Bank Address"
                            className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none placeholder:font-semibold"
                        />
                        <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Bank/Branch Address*
                        </div>
                    </div>

                    <div className="relative border border-purpleColor rounded-3xl p-2">
                        <input
                            type="text"
                            placeholder="Bank Account No"
                            className="w-full rounded-2xl px-3 py-1 focus:outline-none border-none placeholder:font-semibold"
                        />
                        <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Account Number*
                        </div>
                    </div>

                    <div className="relative border border-purpleColor rounded-3xl p-2">
                        <textarea
                            placeholder="Write Instructions"
                            className="w-full rounded-xl px-3 py-6 sm:py-8 focus:outline-none border-none resize-none h-24 placeholder:font-semibold"
                        />
                        <div className="absolute -top-3 left-4 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                            Instructions
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-8 mb-5">
                    <button
                        className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer text-base sm:text-xl">
                        <TfiPlus className="text-lg sm:text-xl" />
                        <span>Add Bank</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputForm;
