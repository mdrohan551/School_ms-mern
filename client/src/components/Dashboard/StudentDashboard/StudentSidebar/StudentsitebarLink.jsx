import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StudentsitebarLink = ({ title, icon: Icon, href }) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <div className="group">
            <Link
                className={`
                    flex 
                     group
                    w-full
                    px-6
                    py-2
                    cursor-pointer
                    ${isActive ? "bg-indigo-400" : ""}
                `}
                to={href}
            >
                {Icon && (
                    <Icon
                        className={`w-[1.2rem] h-auto group-hover:text-indigo-400 dark:text-white ${isActive ? "text-slate-100" : "text-slate-800"}`}
                    />
                )}
                <span
                    className={`text-[0.9rem] -tracking-tighter pl-5  group-hover:text-indigo-400 dark:text-white mt-1 ${isActive ? "text-white" : "text-slate-700"}`}
                >
                    {title}
                </span>
            </Link>
        </div>
    );
};

export default StudentsitebarLink;
