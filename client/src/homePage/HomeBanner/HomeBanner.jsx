import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assertsImg, HomePageData } from '../../constant/HomePageData';
import BgblureShap from '../animationcomponent/bgBlureShap';
import BannerToolCard from './BannerToolCard';
import { CheckCircle, Users, BarChart3 } from "lucide-react";

const { title, description, signUpButton, learnMoreButton, BannerImg } = HomePageData.homeBanner;
const { img4, img5 } = assertsImg;
const toolCards = [
    {
        icon: <CheckCircle className="text-green-500 dark:text-gray-300" size={24} />,
        title: "Free Forever",
        des: "No hidden charges, no trial period. 100% free for all schools.",
        color: "green"
    },
    {
        icon: <Users className="text-blue-500 dark:text-gray-300" size={24} />,
        title: "Unlimited Users",
        des: "Add unlimited students, teachers, and staff anytime.",
        color: "blue"
    },
    {
        icon: <BarChart3 className="text-fuchsia-500 dark:text-gray-300" size={24} />,
        title: "Smart Analytics",
        des: "Get instant reports and insights for your institution.",
        color: "fuchsia"
    }
];
const featureVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 1, type: 'spring' }
    }),
};
const HomeBanner = () => {
    const SignUpIcon = signUpButton.icon;
    const LearnMoreIcon = learnMoreButton.icon;
    return (
        <div className=' bg-gradient-to-r dark:from-[#09327f] dark:to-[#06183b] bg-white overflow-x-hidden  '>
            <div className="  max-w-[1440px] container mx-auto px-4 flex justify-center relative z-1 ">
                <div className="banner_text_button px-1 md:px-32 lg:px-80 text-center py-10 sm:py-20 ">
                    <h1 className="z-2 relative font-bold text-3xl sm:text-6xl nexabold-font leading-8 sm:leading-[4rem] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-white dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
                        {title}
                    </h1>
                    {/* shap animation */}
                    <svg
                        className="absolute top-40 left-180 w-18 h-18 -rotate-60 z-[-1] anim-roted hidden sm:block"
                        viewBox="0 0 48 48"
                        fill="none"
                    >
                        <polygon
                            points="24,6 42,40 6,40"
                            stroke="#b108ff83"
                            strokeWidth="0.5"
                            fill="none"
                        />
                    </svg>
                    <svg
                        className="absolute sm:top-40 top-15 sm:left-full sm:w-18 w-10 sm:h-18 h-10 -rotate-60 z-[-1] anim-roted"
                        viewBox="0 0 48 48"
                        fill="none"
                    >
                        <polygon
                            points="24,6 42,40 6,40"
                            stroke="#b108ff83"
                            strokeWidth="0.5"
                            fill="none"
                        />
                    </svg>
                    <svg
                        className="absolute top-80 left-full w-10 h-10 -rotate-60 z-[-1] anim-roted"
                        viewBox="0 0 48 48"
                        fill="none"
                    >
                        <polygon
                            points="24,6 42,40 6,40"
                            stroke="#dfdfdf"
                            strokeWidth="0.5"
                            fill="none"
                        />
                    </svg>
                    {/* shap animation */}
                    <p className=' pt-5 px-0 md:px-10 lg:px-25 text-gray-600 dark:text-gray-400 popins-font font-light text-[0.8rem] sm:text-sm'>
                        {description}
                    </p>
                    {/* button */}
                    <ul className='flex justify-center gap-5 pt-5'>
                        <li>
                            <Link to={`/signUp`} className='gap-2 sm:gap-3 text-white text-[0.7rem] sm:text-[0.9rem] px-4 sm:px-10 py-2 sm:py-3 flex bg-orange-700 items-center font-light rounded-xl'>
                                <SignUpIcon size={16} />
                                <span>{signUpButton.text}</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('featureSection');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className='gap-3 cursor-pointer text-black text-[0.7rem] sm:text-[0.9rem] px-4 sm:px-10 py-2 sm:py-3 flex backdrop-blur-2xl bg-white/20 ring-1 ring-gray-200 dark:bg-gray-200 shadow-[10px_10px_30px_1px_rgba(0,0,0,0.1)] items-center font-light rounded-xl group transition-all duration-500'
                            >
                                <LearnMoreIcon
                                    size={15}
                                    className="transition-transform duration-500 group-hover:translate-x-1"
                                />
                                <span>{learnMoreButton.text}</span>
                            </button>
                        </li>
                    </ul>
                    {/* PC and mobile graphic image */}
                    <div className='bannerImg gap-5 sm:pt-5 sm:mt-15 mt-5 pt-5 relative  flex flex-col items-center md:block'>
                        <div className="pc relative flex justify-center" >
                            <motion.img
                                src={BannerImg.laptop}
                                className='w-80 md:w-150 lg:w-170 h-auto'
                                alt="pc"
                                loading="lazy"
                            />
                        </div>
                        <img
                            src={BannerImg.mobile1}
                            className='w-15 md:w-24 lg:w-30 h-auto absolute top-5 md:top-12 lg:top-20 -left-2 md:-left-5 lg:-left-8 drop-animation'
                            alt="mobile"
                            loading="lazy"
                        />
                        <div
                            className="lg:flex flex-col gap-6 absolute top-1/2 left-5 md:left-70 lg:left-140 ml-10 md:ml-0 -translate-y-1/2 ">
                            {toolCards.map((card, idx) => (
                                <motion.div
                                    initial={featureVariant.hidden}
                                    variants={featureVariant}
                                    whileInView="visible"
                                    custom={idx}
                                    key={idx}
                                >
                                    <BannerToolCard

                                        icon={card.icon}
                                        title={card.title}
                                        des={card.des}
                                        color={card.color}
                                        className={`w-[270px] mt-3`}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        {/* Shap Design - Always in Background */}


                        {/* Shap Design - Always in Background */}
                        <div className="shap absolute inset-0 z-[-10] pointer-events-none">
                            {/* Only show on lg, hide on md, show on sm */}
                            <img
                                src={img5}
                                className="absolute  lg:-left-40 md:-left-25 w-8 lg:w-15 md:w-15 md:top-1/5 lg:top-1/5  top-0 right-0  drop-animation2 "
                                alt="assets"
                                loading="lazy"
                            />

                            <img
                                src={img4}
                                className="absolute lg:-right-40 md:-right-25 md:-top-20  lg:-top-0  sm:-top-0 sm:right-0 w-8 lg:w-15 md:w-15 -top-20 drop-animation3 "
                                alt="assets"
                                loading="lazy"
                            />
                            {/* ...rest of the shapes... */}
                            <svg
                                className="absolute -top-25 right-5 sm:-top-15 sm:right-50 w-8 h-8 sm:w-13 sm:h-13 -rotate-60 z-[-10] anim-roted "
                                viewBox="0 0 48 48"
                                fill="none"
                            >
                                <polygon
                                    points="24,6 42,40 6,40"
                                    stroke="#b108ff83"
                                    strokeWidth="1"
                                    fill="none"
                                />
                            </svg>
                            <div className='w-5 h-5 border border-gray-500 absolute sm:-right-50 -right-0 sm:bottom-100 bottom-80 z-[-1] anim-roted'></div>
                            <div className='w-3 h-3 border border-gray-400 absolute left-0 top-50 z-[-1] rounded-full animate-bubble2'></div>
                            <div className='w-3 h-3 border border-gray-400 absolute left-0 top-50 z-[-1] rounded-full animate-bubble'></div>
                            <div className='w-3 h-3 border border-gray-400 absolute left-50 top-50 z-[-1] rounded-full animate-bubble2'></div>
                            <div className='w-3 h-3 border border-gray-400 absolute -left-0 top-50 z-[-1] rounded-full animate-bubble'></div>
                            <div className='w-3 h-3 border border-gray-400 absolute left-full top-50 z-[-1] rounded-full animate-bubble2'></div>
                            <div className='w-3 h-3 border border-gray-400 absolute left-150 sm:left-100 top-50 z-[-1] rounded-full animate-bubble'></div>
                        </div>



                    </div>
                </div>
            </div>
            <BgblureShap className="sm:w-120 w-80 sm:h-120 h-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute blur-[200px]   bg-gradient-to-r from-[#0112ff46] to-[#0f5cf7b9] dark:from-[#d919ffa2] dark:to-[#be00f82c] rounded-full z-0" />
        </div>
    );
};

export default HomeBanner;