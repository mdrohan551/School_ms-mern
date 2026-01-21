import React from 'react';
import { CiSettings } from "react-icons/ci";
import Inputform from "./Inputform.jsx";
import FormView from "./formView.jsx";

const AccountSetting = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-3xl p-5 mr-7 flex flex-col lg:flex-row items-start lg:items-center justify-between text-start space-y-3 lg:space-y-0 lg:space-x-5 mt-3 bg-gradient-to-r from-[#5A8DFE] to-[#5A8DFE]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="flex items-center justify-center space-x-2 text-white text-3xl font-semibold">
                        <CiSettings/>
                        <p className="text-xl">Account Settings</p>
                    </div>
                </div>
            </div>

            <div className="max-w-full mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
                    <div className="lg:col-span-2">
                        <Inputform/>
                    </div>
                    <div className="lg:col-span-3 mr-6">
                        <FormView/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSetting;