import React from 'react';
import {Search } from "lucide-react";

const InputForm = () => {
    return (
        <div>
           <div className="p-10 rounded-2xl bg-white mt-8">
               <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-6">
                   <div>
                       <div className="relative border border-purple-400 rounded-full  p-2">
                           <input
                               type="date"
                               className="w-full rounded-full  bg-white px-3 py-2 focus:outline-none border-none"
                           />
                           <div
                               className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                               Homework Date*
                           </div>
                       </div>
                   </div>

                   <div>
                       <div className="relative border border-purple-400 rounded-full  p-2">
                           <input
                               type="text"
                               placeholder="All Classes"
                               className="w-full rounded-full  bg-white px-3 py-2 focus:outline-none border-none"
                           />
                           <div
                               className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                               Class*
                           </div>
                       </div>
                   </div>

                   <div>
                       <div className="relative border border-purple-400 rounded-full  p-2">
                           <input
                               type="text"
                               placeholder="All Teachers"
                               className="w-full rounded-full  bg-white px-3 py-2 focus:outline-none border-none"
                           />
                           <div
                               className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                               Teacher*
                           </div>
                       </div>
                   </div>

                   <div>
                       <button
                           className="bg-[#4A90E2]  text-white border border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer">
                           <Search  className="text-sm"/>
                           <span className="text-sm">Search</span>
                       </button>
                   </div>
               </div>
           </div>

            <div className="p-4 rounded-2xl bg-white mt-8">
                <h1 className="flex items-center justify-center text-[#4A90E2]">No data found!</h1>
            </div>
        </div>
    );
};

export default InputForm;