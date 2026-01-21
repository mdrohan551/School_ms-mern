import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MouseHover from './MouseHover.jsx';
import { developers } from "../../../constant/developerData.js";
import { motion } from 'framer-motion';
const DeveloperDropDown = () => {
    const containerRef = useRef();
    const [mouseMain, setMouseMain] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const moveMouse = (e) => {
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            const relativeX = e.clientX - rect.left;
            const relativeY = e.clientY - rect.top;

            setMouseMain({ x: relativeX, y: relativeY });
        };

        const container = containerRef.current;
        container.addEventListener('mousemove', moveMouse);

        return () => {
            container.removeEventListener('mousemove', moveMouse);
        };
    }, []);

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const previewWidth = 200;
    const padding = 20;

    const isRightSide = mouseMain.x < containerWidth / 2;

    const previewX = isRightSide
        ? mouseMain.x + padding
        : mouseMain.x - previewWidth - padding;

    const previewY = mouseMain.y;

    const moverValue = {
        default: {
            x: mouseMain
        },
    };

    const [hovercss, setHovercss] = useState({
        display: 'none',
        websiteImg: null
    });

    const mouseHover = (img) => {
        setHovercss({
            display: 'block',
            websiteImg: img
        });
    };

    const mouseLeave = () => {
        setHovercss({
            display: 'none',
            websiteImg: null
        });
    };

    return (
 <div
  ref={containerRef}

  className="
    w-[95vw]
    max-w-[420px]
    sm:max-w-[500px]
    md:max-w-[700px]
    lg:max-w-[900px]
    min-h-[300px]
    p-4
    bg-white dark:bg-gray-900
    sm:backdrop-blur-2xl
    sm:bg-white/5
    sm:dark:text-white
    shadow-xl
    rounded-xl
    ring-1
    ring-purple-400
    dark:ring-gray-400
    relative

   z-999
  "
>

            {/* Developer Images */}
            <ul className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                {developers.map((dev, index) => (
                    <li
                        key={index}
                        className={`h-14 w-14 -mr-5 sm:h-16 sm:w-16 md:h-10 md:w-10 rounded-full overflow-hidden ring-2 ring-green-500 ${index !== 0 ? '-ml-2' : ''}`}
                    >
                        <a href={dev.portfolio} target="_blank" rel="noopener noreferrer">
                            <img
                                onMouseEnter={() => mouseHover(dev.webImg)}
                                onMouseLeave={mouseLeave}
                                src={dev.img}
                                className="w-full h-full object-cover "
                                alt={dev.name}
                                loading="lazy"
                            />
                        </a>
                    </li>

                ))}
                <div className="flex  ml-4 sm:gap-1 mb-4 relative">
                    <span className="relative flex size-3 ">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-green-500"> </span>
                    </span>
                    <span className="text-gray-400 dark:text-gray-200 ml-1">online</span>
                </div>


            </ul>
            {/* ✨ Updated Premium Title Section */}
            <h1 className="flex items-center gap-2  text-xl sm:text-2xl md:text-3xl font-medium mb-0">
                <span className="tracking-tigh text-2xl text-gray-800 dark:text-gray-300 ">Meet the Creators & Their Roles</span>
            </h1>
            <p className="text-sm text-gray-700 mb-10 dark:text-gray-300">
                Explore the skilled individuals behind this project and their unique creative contributions in detail.
            </p>

            {/* Roles - Compact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                {developers.map((dev, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => mouseHover(dev.webImg)}
                        onMouseLeave={mouseLeave}
                       className="flex backdrop-blur-2xl bg-white/40 dark:bg-white/10 rounded-md shadow-sm dark:ring-[0.4px] dark:ring-gray-400 overflow-hidden "

                    >
                        {/* Image Left */}
                        <div className="w-[80px] h-[80px] flex-shrink-0">
                            <img
                                src={dev.img}
                                alt={dev.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Right */}
                        <div className="p-2 flex flex-col  justify-center">
                            <h3 className="text-sm font-semibold leading-tight mb-1 dark:text-gray-300">{dev.name}</h3>
                            <ul className="text-[11px] text-gray-600 space-y-[2px] mb-1 dark:text-gray-300">
                                {dev.roles.map((role, i) => (
                                    <li key={i}>{role}</li>
                                ))}
                            </ul>
                            <Link
                                to={dev.portfolio}
                                target="_blank"
                                className="text-red-500 underline text-[11px]"
                                onMouseEnter={() => mouseHover(dev.webImg)}
                                onMouseLeave={mouseLeave}
                            >
                                Portfolio
                            </Link>


                        </div>
                    </div>
                ))}

            </div>


            {/* Hover Preview */}
            <motion.div
                className="absolute z-50 hidden sm:block"
                variants={moverValue}
                animate="default"
                style={{
                    top: previewY,
                    left: previewX,
                    display: hovercss.display,
                    pointerEvents: 'none',
                }}
            >
                <MouseHover hovercss={hovercss} />
            </motion.div>
        </div>
    );
};

export default DeveloperDropDown;
