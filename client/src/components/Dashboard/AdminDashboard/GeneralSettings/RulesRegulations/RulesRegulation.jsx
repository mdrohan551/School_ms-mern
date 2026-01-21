import React from 'react';
import {IoHomeOutline} from "react-icons/io5";
import Form from "./form.jsx";

const RulesRegulation = () => {
    return (
        <div>
            <div
                className="max-w-full mx-auto shadow rounded-xl p-3 mr-7 flex items-center text-start space-x-5 mt-3 bg-white">
                <h1 className="text-xl font-medium">General Settings</h1>
                <div className="flex items-center justify-center space-x-2">
                    <IoHomeOutline className="text-xl"/>
                    <p className="text-xl">- Rules & Regulations</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <Form/>
            </div>
        </div>
    );
};

export default RulesRegulation;