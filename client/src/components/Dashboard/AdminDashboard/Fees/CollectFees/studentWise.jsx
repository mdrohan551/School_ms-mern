import React from 'react';

const StudentWise = () => {
    return (
        <div>
            <div className="p-6 pt-10 rounded-2xl border border-gray-300 shadow-md bg-white">

                {/*  Header Section */}
                <h1 className="text-2xl font-semibold text-gray-700 flex items-center justify-center mb-1">
                    Collect Fees of a Student</h1>
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

                {/*  Input Section */}
                <div className="relative border border-purple-400 rounded-full p-2">
                    <input
                        type="text"
                        placeholder="Search Student"
                        className="rounded-full px-3 py-1 focus:outline-none border-none"
                    />
                    <div
                        className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Search Student*
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentWise;