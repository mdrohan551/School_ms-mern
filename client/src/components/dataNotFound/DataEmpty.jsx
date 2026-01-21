import React from 'react';

const DataEmpty = ({text="Data"}) => {
    return (
        <>
            <h1 className="text-2xl  flex items-center flex-col justify-center w-full h-100 text-gray-400">
                <img src="/assests/empty_item.svg" alt="error" className="w-60 h-100 opacity-50"/>
                <p className="-mt-20"> Oops! {text} Not Found</p>
            </h1>
        </>
    );
};

export default DataEmpty;