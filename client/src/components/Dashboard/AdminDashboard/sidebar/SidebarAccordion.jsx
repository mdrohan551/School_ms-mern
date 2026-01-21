import React from 'react';
import {ChevronDown, Lock} from "lucide-react";
import {Link, useLocation} from 'react-router-dom';
import {desktopVersion, isDisabled} from '../../../../constant/anchorLockandAdd';

const SidebarAccordion = ({title, index, openIndex, onToggle, pages, icon: Icon}) => {
    const location = useLocation();
    const isOpen = openIndex === index; // Check if this accordion is open
    const isActive = pages.some(item => item.href === location.pathname);


    // Handle click to toggle open/close
    const handleClick = () => {
        onToggle(index); // Toggle the accordion open/close
    };


    return (<>
        <div className='group '>
            <button
                onClick={handleClick}
                className={`
                        flex
                        justify-between
                        w-full
                        px-6
                        py-2
                        
                        cursor-pointer
                        ${isActive ? "bg-indigo-400" : ""}
                        `}


            >
                {/* Left Icon & Middle Text */}
                <div className='flex gap-2 md:gap-4'>
                    {Icon && <Icon
                        className={`w-[0.9rem] h-auto dark:text-white ${isActive ? "text-slate-100" : "text-slate-800"}`}/>}
                    <span
                        className={`text-[0.9rem] -tracking-tighter mt-1 dark:text-gray-100 ${isActive ? "text-white" : "text-slate-700"}`}>
                        {title}
                    </span>
                </div>

                {/* Arrow Icon  */}
                <ChevronDown
                    className={`
                            w-4  
                            transition-all 
                            ease-in-out 
                            duration-300
                            dark:text-gray-100
                            ${isActive ? "text-slate-100" : "text-slate-800"}
                            ${isOpen !== isActive ? "rotate-180" : ""}
                        `}
                />
            </button>

            {/* Nesting Pages  */}
            <div
                className={`
        grid 
        overflow-hidden 
        transition-all 
        duration-300 
        ease-in-out 
        text-slate-500 
        ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
    `}
            >


                <div className='flex flex-col gap-3 overflow-hidden py-1'>
                    {pages.map((page, i) => {
                        const isPathActive = location.pathname === page.href;
                        const isDisable = isDisabled.includes(page.anchor); // Only these pages will have the tooltip
                        const loackandDisloack = desktopVersion.includes(page.anchor); // To show tooltip on these links only

                        return (<div key={i} className="flex items-center gap-1 ml-7 relative">

                            <Link
                                to={isDisable ? "#" : page.href}
                                onClick={(e) => isDisable && e.preventDefault()}
                                className={'text-[14px]  pl-2 relative dark:text-gray-400 ' + 'before:content-[""] before:absolute before:w-[1px] before:h-9 before:bg-slate-300 before:left-[-10px] ' + 'hover:text-indigo-500 ' + 'hover:after:content-[""] hover:after:absolute hover:after:-left-[13px] hover:after:top-[6px] hover:after:w-2 ' + 'hover:after:h-2 hover:after:rounded-full hover:after:bg-indigo-500 ' + 'focus:after:content-[""] focus:after:absolute focus:after:-left-[13px] focus:after:top-[6px] ' + 'focus:after:w-2 focus:after:h-2 focus:after:rounded-full focus:after:bg-indigo-500 ' + (isPathActive ? ' text-indigo-500 after:content-[""] after:absolute after:-left-[13px] after:top-[6px] after:w-2 after:h-2 after:rounded-full after:bg-indigo-500' : '') + (isDisable ? ' text-slate-400 cursor-not-allowed pointer-events-none' : '')}
                            >
                                {page.anchor}
                            </Link>
                            {isDisable && (<Lock className="w-4 h-4 text-red-400 "/>)}

                            {/* Tooltip - Only show on hover of Fees and Discount Type links */}
                            {isDisable && loackandDisloack && (<div
                                className="absolute left-0 -top-1 px-2 py-1 rounded bg-black text-white text-xs z-[9999] opacity-0 hover:opacity-100 transition-all duration-300">
                                This feature is currently disabled. We plan to work on it in the future
                            </div>)}
                        </div>);
                    })}
                </div>


            </div>
        </div>
    </>);
};

export default SidebarAccordion;
