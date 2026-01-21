 import React from 'react';
 import { Link, useLocation } from 'react-router-dom'

const SidebarOnlyPage = ({title, icon:Icon, href}) => {
    const location = useLocation();
    const isActive = href === location.pathname;
    return (
        <>
            <div className={`
            flex 
                gap-2 
                md:gap-4 
                items-center 
                px-5 py-2 
                mb-3
                ${isActive ? "bg-indigo-400" : ""}
                `}
                
            >
                {Icon && 
                    <Icon 
                        className={`
                        w-4 h-auto dark:text-white
                        ${isActive ? "text-slate-100" : "text-slate-800"}`} 
                    />
                }
                <Link 
                    to={href} 
                    className={`
                    text-md -tracking-tighter dark:text-gray-100
                    ${isActive ? "text-white":"text-slate-700"}`}
                >
                     { title } 
                </Link>
            </div>
        </>
    );
};

export default SidebarOnlyPage;