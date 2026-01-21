import React from 'react';

const ProgressBar = ({ title, value, color = 'text-blue-600', barColor = 'bg-blue-400' }) => {
    return (
        <div className="bg-gray-50 dark:bg-black dark:ring-[1px] shadow-md rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">{title}</span>
                <span className={`font-bold ${color}`}>{value}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                    className={`${barColor} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
