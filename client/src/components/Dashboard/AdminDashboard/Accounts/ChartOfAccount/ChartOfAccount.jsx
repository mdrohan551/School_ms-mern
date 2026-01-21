import React from 'react';
import {IoHomeOutline} from "react-icons/io5";
import Accountform from "./Accountform.jsx";
import Dataform from "./Dataform.jsx";

const ChartOfAccount = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <h1 className="text-xl font-medium">Accounts</h1>
                    <div className="flex items-center justify-center space-x-2">
                        <IoHomeOutline className="text-xl"/>
                        <p className="text-xl">-  Chart of accounts</p>
                    </div>
                </div>
            </div>
            <div className="max-w-full mx-auto grid sm:grid-cols-1 lg:grid-cols-5 gap-6 mt-10">
                <div className="col-span-2">
                    <Accountform/>
                </div>
                <div className="col-span-3 mr-6">
                    <Dataform/>
                </div>
            </div>
        </div>
    );
};

export default ChartOfAccount;