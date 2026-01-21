import React, { useState } from 'react'
import { assertsImg, whyChoose } from '../constant/HomePageData'
import BgblureShap from './animationcomponent/bgBlureShap'
import { motion } from 'framer-motion';

// animation reveal
const featureVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.7, type: 'spring' }
    }),
};

const WhyChoose = () => {
    const [style, setStyle] = useState({
        display: 'none',
        websiteImg: null
    });
    const mouseHover = () => {
        setStyle({ display: "block", opacity: 1 });
    };
    const mouseLeav = () => {
        setStyle({ display: "none", opacity: 0 });
    };

    return (
        <section className="dark:bg-[#0f0606] bg-[#ffffff] overflow-x-hidden ">
            <div className="max-w-[1440px] mx-auto px-4 py-10 sm:py-20">
                <div className="text-center mb-10">
                    <h1 className='text-2xl sm:text-4xl md:text-6xl nexabold-font uppercase bg-gradient-to-l from-[#0c0000] via-[#3b3b3b] to-[#fff] dark:from-[#ffffff5b] dark:via-[#ffffffa4] dark:to-[#00000027] inline-block rounded p-3 sm:p-5 bg-clip-text text-transparent'>
                        why us ?
                    </h1>
                </div>

                <div className="grid  grid-cols-1 lg:grid-cols-2 sm:gap-30 gap-10 items-center">
                    <motion.div
                        className="why_text relative order-2 sm:order-1"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={featureVariant}
                    >
                        <h1 className='nexabold-font text-xl sm:text-3xl md:text-4xl dark:text-gray-300 text-gray-700'>
                            {whyChoose.title}

                        </h1>
                        <p className='text-sm sm:text-base popins-font dark:text-gray-300 text-gray-700 mt-3 sm:mt-5'>
                            {whyChoose.description}

                        </p>

                        <div className='hidden lg:block md:hidden '>
                            <motion.video
                                className={`w-full h-auto rounded-xl absolute -top-10 ${style.display === "block" ? "block" : "hidden"}`}
                                src={whyChoose.leptopMain}
                                autoPlay
                                loop
                                muted
                                playsInline
                                initial={featureVariant.hidden}
                                whileInView="visible"
                                viewport={{ once: false, amount: 0 }}
                                variants={featureVariant}
                            />
                        </div>
                    </motion.div>

                    <div
                        className=" order-1 sm:order-2 relative rounded-xl p-[1px] bg-gradient-to-br dark:from-[#ca3500] from-[#fff] dark:via-[#0c0c0c94] via-[#0000005b] dark:to-[#ffffffd2] to-[#fff] shadow-xl group transition-all duration-500 delay-500 ease-linear hover:via-[#00745a]"
                        onMouseEnter={mouseHover}
                        onMouseLeave={mouseLeav}
                    >
                        <div className="rounded-xl dark:bg-[#000000] bg-[#fffffff1] p-4 sm:p-5 flex items-center justify-center relative z-1 group  ">
                            <motion.div
                                initial={featureVariant.hidden}
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.9 }}
                                variants={featureVariant}
                            >
                                <video
                                    className=" transition-all duration-300 w-full h-auto rounded-xl hover:scale-[1] lg:hover:scale-[1.5] md:hover:scale-[1]   "
                                    src={whyChoose.mainVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />

                            </motion.div>

                            <motion.img
                                initial={{ scale: 0.7, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
                                viewport={{ once: false, amount: 0.3 }}
                                src={assertsImg.img2}
                                className='drop-animation absolute left-[-1rem] md:left-0 lg:left-[-5rem]  w-32 sm:w-60 top-0 sm:top-20 z-10 group-hover:lg:left-[-20rem] transition-all duration-300 ease-linear '
                            />
                            <motion.img
                                initial={{ scale: 0.7, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
                                viewport={{ once: false, amount: 0.3 }}
                                src={assertsImg.img3}
                                className='drop-animation2 absolute right-[-0.5rem] md:right-5 lg:right-[-2.5rem] w-24 sm:w-40 top-[8rem] z-10 group-hover:lg:right-[-10rem] transition-all duration-300 ease-linear'
                            />
                            <motion.img
                                initial={{ scale: 0.7, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
                                viewport={{ once: false, amount: 0.3 }}
                                src={assertsImg.img1}
                                className='drop-animation absolute left-[-1rem] md:left-0 lg:left-[-5rem] w-24 sm:w-40 sm:top-[16rem] top-[5rem] z-10 group-hover:lg:left-[-15rem] transition-all duration-300 ease-linear'
                            />

                            <BgblureShap className="sm:w-[400px]  w-[300px] sm:h-[400px] h-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute blur-[150px] bg-gradient-to-r from-[#01a6d842] dark:from-[#49002dda] to-[#1b91ffe8] dark:to-[#7b13f1ef] rounded-full z-[-1]" />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default WhyChoose;
