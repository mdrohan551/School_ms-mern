import React from 'react';
import {IoHomeOutline} from "react-icons/io5";
import Feesform from "./Feesform.jsx";

const CollectFees = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex items-center text-start space-x-5 mt-3 bg-white">
                <h1 className="text-xl font-medium">Fees</h1>
                <div className="flex items-center justify-center space-x-2">
                    <IoHomeOutline className="text-xl"/>
                    <p className="text-xl">- Collect Fees</p>
                </div>
            </div>
            <div className="max-w-4xl mx-auto">
           <Feesform/>
            </div>
        </div>
    );
};

export default CollectFees;