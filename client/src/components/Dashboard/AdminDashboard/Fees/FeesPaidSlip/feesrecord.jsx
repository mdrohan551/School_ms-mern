import React from 'react';
import { Plus, Search } from 'lucide-react';

const Feesrecord = () => {
    return (
        <div className="mt-10 relative  mx-auto">

            {/* Floating Header Label */}
            <div className="absolute -top-4 left-4 bg-white px-4 py-1 text-sm font-medium text-blue-600 border border-blue-300 rounded-t-md shadow-sm flex items-center gap-2">
                <Search className="w-4 h-4" />
                Fees Record
            </div>

            {/* Form Container */}
            <div className="p-6 pt-10 rounded-2xl border border-gray-300 shadow-md bg-white">

                <div className="space-y-6">
                    {/* Form Inputs */}
                    <div className="relative border border-purple-400 rounded-full p-2">
                        <input
                            type="date"
                            className="w-full rounded-full px-3 py-2 focus:outline-none border-none"
                        />
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Fees Month*
                        </div>
                    </div>

                    {/* Search Student */}
                    <div className="relative border border-purple-400 rounded-full p-2">
                        <input
                            type="text"
                            placeholder="Search Student"
                            className="w-full rounded-full px-3 py-2 focus:outline-none border-none"
                        />
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Search Student*
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center mt-8">
                    <button
                        className="bg-orangeColor active:bg-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">
                        <Plus className="text-base"/>
                        <span>Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Feesrecord;
