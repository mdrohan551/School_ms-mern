import React from 'react';
import {GoSearch} from "react-icons/go";

const Paysalary = () => {
    return (
        <div className="flex items-center justify-center gap-2 pt-23">
            <input type="search" placeholder="Search Employee"
                   className="border-b w-1/6  focus:outline-none placeholder:text-xl"/>
            <GoSearch className="text-2xl border-b cursor-pointer"/>
        </div>
    );
};

export default Paysalary;