import React from 'react';

const SearchForm = () => {
    return (
        <div className="rounded-2xl shadow-xl border border-gray-200 p-5 w-full bg-white space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Show entries section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span>Show</span>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purpleColor"
                    >
                        {[10, 25, 50, 100].map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <span>entries</span>
                </div>

                {/* Search bar section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                    <label htmlFor="search">Search :</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-500 rounded-xl px-3 py-1 focus:outline-none w-full sm:w-auto"
                    />
                </div>
            </div>

            <div className="max-w-full mx-auto shadow rounded-2xl p-3 mr-0 lg:mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-[#6C63FF]">
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 md:px-10 gap-4 text-white">
                    <h1 className="text-xl font-medium">Bank Name</h1>
                    <h1 className="text-xl font-medium">Logo</h1>
                    <h1 className="text-xl font-medium">Account No</h1>
                    <h1 className="text-xl font-medium">Actions</h1>
                </div>
            </div>

            <h1 className="flex items-center justify-center mt-5 text-xl text-center">No data available in table</h1>
            <hr />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1>Showing 0 to 0 of 0 entries</h1>
                <div className="flex items-center gap-6 md:gap-12 text-xl text-gray-500">
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
    );
};

export default SearchForm;
