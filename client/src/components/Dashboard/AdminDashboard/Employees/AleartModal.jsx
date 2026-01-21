import React from 'react';
import { AlertTriangle } from "lucide-react";

const AleartModal = ({ HandleDelete, setDeleteAlertId }) => {
    return (
        <div className="w-full h-100 mx-auto bg-white dark:bg-blue-950 rounded-xl p-4 sm:p-6 animate-slide-top shadow-xl">
            <div className="flex md:flex-col sm:flex-row gap-4 md:gap-1 md:items-center sm:gap-6">
                {/* Icon */}
                <div className="bg-red-500/20 w-12 h-12 sm:w-14 sm:h-14 p-2 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                    <AlertTriangle className="text-red-600 w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Content */}
                <div className="flex flex-col text-center sm:text-left">
                    <p className="font-bold text-left text-gray-900 dark:text-white text-sm sm:text-base">
                        Account to <span className="text-red-600">Deactivate!</span>
                    </p>


                    {/* Buttons */}
                    <div className="flex justify-between mt-4 gap-3">
                        <button
                            onClick={() => {
                                HandleDelete();
                                setDeleteAlertId(null);
                            }}
                            className="w-full sm:w-1/2 text-center hover:bg-transparent hover:text-purple-600 hover:ring hover:ring-purple-600 py-2 bg-red-600 rounded-lg text-white transition"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setDeleteAlertId(null)}
                            className="w-full sm:w-1/2 text-center hover:bg-transparent hover:text-purple-600 hover:ring hover:ring-purple-600 py-2 bg-gray-700 dark:bg-green-700 rounded-lg text-white transition"
                        >
                            <span className="hidden md:block">x</span>
                            <span className="block md:hidden">cancel</span>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AleartModal;
