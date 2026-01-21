import React from 'react';

const InputField = ({onChange, label, type, placeholder, name, value,Errors}) => (
    <div className="relative border border-purpleColor rounded-3xl p-2 ">
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            className="w-full dark:placeholder:text-gray-500 rounded-2xl px-3 py-1 focus:outline-none border-none placeholder:text-lg placeholder:font-medium"
        />


        {
            Errors ? (
                <div
                    className="absolute -top-3 left-4 text-white text-xs px-2 py-0.5 rounded-full bg-red-700">
                    {Errors}
                </div>
            ) : (
                <div
                    className="absolute -top-3 left-4 text-white text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9]">
                    {label}
                </div>
            )
        }



    </div>);

export default InputField;