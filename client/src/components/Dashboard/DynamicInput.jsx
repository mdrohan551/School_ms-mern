import React from 'react';

const DynamicInput = ({type, icon: Icon, placeholder, divStyle, name, value, onChange, autoComplete}) => {
    return (
        <div className={`group flex gap-2 py-2 px-2 rounded-md border  ${divStyle}`}>
            {Icon &&
                <Icon className={`opacity-30 group-focus-within:opacity-50 w-25 text-gray-600 dark:text-white `}
                />}
            <input
                className='w-100 focus:outline-none text-gray-400 placeholder:text-[0.8rem] placeholder:text-gray-400 text-[0.8rem] sm:text-sm'
                name={name}
                value={value}
                onChange={onChange}
                type={type} placeholder={placeholder}
                autoComplete={autoComplete} // ✅ fix
            />
        </div>
    );
};

export default DynamicInput;