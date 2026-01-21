import React from 'react';
import {Smile} from "lucide-react";

const Feescard = () => {
    return (
        <div>
            <div className="p-7 rounded-2xl shadow-md bg-white space-y-4 mt-18 max-w-4xl mx-auto">
                <div className="flex items-center justify-center ">
                    <Smile className="w-12 h-12"/>
                </div>
                <h1 className="flex items-center justify-center font-semibold gap-x-1">
                    <span>No Fee Defaulters in</span>
                    <span className="text-blue-600">May 2025</span>
                </h1>
            </div>
        </div>
    );
};

export default Feescard;