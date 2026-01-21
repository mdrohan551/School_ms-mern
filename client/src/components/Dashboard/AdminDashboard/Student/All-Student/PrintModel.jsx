import React from 'react';

const PrintModel = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 ]: "
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50  ">
                <div className="bg-white rounded-lg shadow-lg   relative ">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
                    >
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};

export default PrintModel;
