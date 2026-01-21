import React, { useState } from 'react';
import { CurrencyData, data } from "../../../../../constant/AccountsettingData.js";
import { Eye, EyeOff } from 'lucide-react';
import { TfiReload } from "react-icons/tfi";

const Inputform = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSelectCountry = (value) => {
        setSelectedCountry(value);
        setIsCountryOpen(false);
    };

    const handleSelectCurrency = (value) => {
        setSelectedCurrency(value);
        setIsCurrencyOpen(false);
    };

    return (
        <div className="space-y-6 w-full  px-4 sm:px-6 lg:px-8">
            {/* Username */}
            <div className="relative border border-purpleColor rounded-3xl p-2">
                <input
                    type="text"
                    placeholder="New Email ?"
                    className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none placeholder:font-semibold"
                />
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                    Username*
                </div>
            </div>

            {/* Password */}
            <div className="relative border border-purpleColor rounded-3xl p-2">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full rounded-2xl shadow px-3 py-1 focus:outline-none border-none placeholder:font-semibold pr-10"
                />
                <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                    Password*
                </div>
            </div>

            {/* Country Selection */}
            <div className="relative border border-purpleColor rounded-3xl p-2">
                <div
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="cursor-pointer w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 bg-white"
                >
                    {selectedCountry || 'Select Time Zone'}
                </div>
                {isCountryOpen && (
                    <div className="absolute z-50 left-0 top-full mt-1 w-full max-h-48 overflow-y-auto bg-white rounded-2xl shadow-lg">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectCountry(item)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                )}
                <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                    Country*
                </div>
            </div>

            {/* Currency Selection and Symbol Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Currency Dropdown */}
                <div className="relative border border-purpleColor rounded-3xl p-2">
                    <div
                        onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                        className="cursor-pointer w-full rounded-2xl shadow-md px-3 py-1 focus:outline-none border-none pr-8 bg-white"
                    >
                        {selectedCurrency || 'Select Currency'}
                    </div>
                    {isCurrencyOpen && (
                        <div className="absolute left-0 top-full mt-1 w-full max-h-48 overflow-y-auto bg-white rounded-2xl shadow-lg">
                            {CurrencyData.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelectCurrency(item)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Currency*
                    </div>
                </div>

                {/* Currency Symbol Input */}
                <div className="relative border border-purpleColor rounded-3xl p-2">
                    <input
                        type="text"
                        placeholder="Currency Symbol"
                        className="w-full pl-4 rounded-2xl shadow py-1 focus:outline-none border-none placeholder:font-semibold"
                    />
                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                        Symbol*
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center text-white font-medium mt-8">
                <button className="bg-gradient-to-r from-[#00C9FF] to-[#0057B7] border-transparent active:border-gray-400 px-4 py-2 rounded-full flex items-center space-x-2 hover:opacity-90 transition cursor-pointer">
                    <TfiReload className="text-base" />
                    <span>Update Settings</span>
                </button>
            </div>
        </div>
    );
};

export default Inputform;
