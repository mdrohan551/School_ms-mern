import React from 'react';
import { Crosshair, Wallet } from "lucide-react";
import {EstimateFeeData} from "../../../../../constant/DashboardContent";
const Estimated = () => {
    return (
        <div className='bg-gray-50 dark:bg-black dark:ring-[1px] p-5 rounded-lg shadow-md flex flex-col gap-6 '>
            {/* Header */}
            <p className="text-sm font-semibold dark:text-gray-400 text-black">Estimated Fee This Month</p>

            {/* Estimation */}
            <div className='flex flex-col items-center text-red-400 text-sm font-semibold'>
                <div className='flex items-center gap-1'>
                    <Crosshair className="w-3 h-3" />
                    <span>Estimation</span>
                </div>
                <p className='text-3xl font-bold text-red-400'>$ {EstimateFeeData.total}</p>
            </div>

            {/* Collections & Remainings */}
            <div className="flex justify-center items-center gap-10  pt-4">
                {/* Collections */}
                <div className='flex flex-col items-center'>
                    <p className="bg-blue-600 text-white px-2 py-[2px] rounded text-sm font-bold">$ {EstimateFeeData.Remainings}</p>
                    <div className='flex items-center gap-1 text-emerald-400 text-xs mt-1'>
                        <Wallet className="w-4 h-4" />
                        <span>Collections</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-10 border-l border-gray-300"></div>
                {/* Remainings */}
                <div className='flex flex-col items-center'>
                    <p className="text-black dark:text-gray-400 text-sm font-bold">$ {EstimateFeeData.collections}</p>
                    <div className='flex items-center gap-1 text-rose-400 text-xs mt-1'>
                        <Wallet className="w-4 h-4 rotate-180" />
                        <span>Remainings</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Estimated;
