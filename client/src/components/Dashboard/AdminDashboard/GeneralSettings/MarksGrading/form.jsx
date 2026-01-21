import React, { useState } from 'react';
import MarksGradingform from "./MarksGradingform.jsx";
import FailCriteria from "./FailCriteria.jsx";

const Form = () => {
    const [selected, setSelected] = useState("Marks Grading");

    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <div className="flex gap-4">
                <button
                    value="Marks Grading"
                    onClick={(e) => setSelected(e.target.value)}
                    className={`px-4 py-2 bg-gray-200 rounded-md shadow cursor-pointer ${selected === "Marks Grading" ? "bg-white text-blue-800 font-semibold" : "bg-gray-200 "} `}
                >
                    Marks Grading
                </button>
                <button
                    value="fail"
                    onClick={(e) => setSelected(e.target.value)}
                    className={`px-4 py-2 bg-gray-200 rounded-md shadow cursor-pointer ${selected === "fail" ? "bg-white text-blue-800 font-semibold" : "bg-gray-200"} `}
                >
                    Fail Criteria
                </button>
            </div>
            {
                selected === "Marks Grading" ?

                    <span className="shadow-md rounded-2xl p-5 bg-white mb-20">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-700 flex items-center justify-center mb-3">Customize Grading</h1>
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
                            <MarksGradingform />
                        </div>
                    </span>
                    : selected === "fail" ?
                        <span className="shadow-md rounded-2xl p-5 bg-white mb-20">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-700 flex items-center justify-center mb-3">Fail Criteria</h1>
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
                                <FailCriteria />
                            </div>
                        </span> : null
            }

        </div>
    );
};

export default Form;
