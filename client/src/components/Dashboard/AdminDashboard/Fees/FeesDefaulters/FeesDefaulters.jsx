import React from 'react';
import {IoHomeOutline} from "react-icons/io5";
import Button from "./button.jsx";

const FeesDefaulters = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-xl font-medium">Fees</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-xl"/>
                        <p className="text-xl">-  Fees Defaulters</p>
                    </div>
                </div>
            </div>
            <div className="max-w-full mx-auto">
             <Button/>
            </div>
        </div>
    );
};

export default FeesDefaulters;