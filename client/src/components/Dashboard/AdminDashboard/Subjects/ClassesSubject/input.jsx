import React from 'react';

const Input = () => {
    return (
        <div className="mt-12 ml-12">
            <label
                htmlFor="file-upload"
                className="w-15 h-auto px-4 py-6 flex flex-col items-center justify-center cursor-pointer rounded-2xl border-2 border-dotted border-blue-700 bg-white text-blue-800 font-semibold text-lg text-center space-y-1 shadow-sm hover:shadow-md transition-shadow"
            >
                <span className="text-2xl font-bold">-</span>
                {
                    "ASSIGNSUBJECTS".split("").map((item, index) => (
                        <h1 key={index}>{item}</h1>
                    ))
                }
            </label>
        </div>
    );
};

export default Input;
