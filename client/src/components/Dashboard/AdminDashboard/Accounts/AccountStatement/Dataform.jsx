import React from 'react';

const Dataform = () => {
    return (
            <div>
                <div
                    className="shadow rounded-3xl p-5 lg:flex-row items-start lg:items-center justify-between space-y-3 lg:space-y-0 lg:space-x-5 mt-4 bg-white">

                    {/*button section*/}
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

                        </div>

                        {/*Search section*/}
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

                    {/*StudentIdCardStyleButton section*/}
                    <div>
                        <div
                            className="p-3 rounded-md shadow bg-gray-200 border border-b border-gray-400 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 cursor-pointer shadow-md mt-7 overflow-x-auto text-sm sm:text-base">
                            <div  className="flex items-center space-x-4 min-w-[120px]">
                                <h1 className="font-semibold">Date</h1>

                            </div>

                            <div  className="flex items-center space-x-4 min-w-[160px]">
                                <h1 className="font-semibold">Description</h1>

                            </div>

                            <div  className="flex items-center space-x-4 min-w-[130px]">
                                <h1 className="font-semibold">Debt</h1>

                            </div>

                            <div  className="flex items-center space-x-4 min-w-[150px]">
                                <h1 className="font-semibold">Credit</h1>

                            </div>

                            <div className="flex items-center space-x-4 min-w-[150px]">
                                <h1 className="font-semibold">	Net Balance</h1>

                            </div>

                        </div>

                        {/*Data Show section*/}
                        <h1 className="flex items-center text-gray-500 justify-center text-sm sm:text-xl mt-9">No data
                            available in
                            table</h1>
                        <hr className="mt-5"/>
                        <div className="flex items-center justify-between max-w-3xl mx-auto">
                            <p> $ 0</p>
                            <p> $ 0</p>
                            <p> $ 0</p>
                        </div>


                        <div
                            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-7 text-sm sm:text-base">
                            <h1>Showing 0 to 0 of 0 entries</h1>
                            <div className="flex items-center gap-6 md:gap-12 text-gray-500">
                                <button
                                    disabled
                                    className="disabled:text-gray-500 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled
                                    className="disabled:text-gray-500 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Dataform;