import React from 'react';
import {Lock} from "lucide-react";

const PaidInvoice = () => {
    return (
        <div>
            <div className="p-6 pt-10 rounded-2xl border border-gray-300 shadow-md bg-white">


                {/*  Header Section */}
                <h1 className="text-2xl font-semibold text-gray-700 flex items-center justify-center mb-1">
                    Scan paid invoice</h1>
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


                {/*  Bottom Section */}
                   <div className="flex items-center justify-center gap-2 text-black font-bold mt-10">
                       <Lock />
                       <h1>This option is locked.</h1>
                   </div>
                <p className="flex items-center justify-center mt-2">Available in paid Desktop version.</p>
            </div>
        </div>
    );
};

export default PaidInvoice;