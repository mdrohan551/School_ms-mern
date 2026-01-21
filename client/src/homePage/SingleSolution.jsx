import { Warehouse } from 'lucide-react'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { singleSolutioncontent } from '../constant/HomePageData'
import BgblureShap from './animationcomponent/bgBlureShap'
import { motion } from 'framer-motion';

const featureVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 1, type: 'spring' }
    }),
};

// ✅ Text Clamp Component
const ReadMoreText = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <p className={`text-[0.8rem] dark:text-gray-300  text-gray-800 mt-5 sm:text-justify transition-all duration-300 ${!isExpanded ? 'line-clamp-6' : ''}`}>
                {text}
            </p>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-blue-500 hover:underline text-sm"
            >
                {isExpanded ? 'Show Less' : 'Read More'}
            </button>
        </div>
    );
};

const SingleSolution = () => {
    return (
        <section className='bg-[#fff] dark:bg-[#000] '>
            <div className='max-w-[1440px] mx-auto px-4 py-20 sm:py-30 relative z-0 '>
                <div className="text-center mb-10">
                    <h1 className='text-2xl  sm:text-4xl nexabold-font uppercase bg-gradient-to-l from-[#0c0000] via-[#3b3b3b] to-[#0c0000] dark:from-[#ffffff8a] dark:via-[#ffffffde] dark:to-[#8d8d8daf] inline-block rounded p-3 sm:p-5 bg-clip-text  text-transparent'>
                        Solution
                    </h1>
                </div>
                <div className="solution_content grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center ">
                    <div className='order-1 md:order-1 lg:order-0 pt-20 sm:pt-20 '>
                        <div
                            className="textsolution"
                        >
                            <h1 className='sm:text-2xl text-1xl  nexabold-font text-gray-800 dark:text-gray-300 '>{singleSolutioncontent.title}</h1>

                            {/* ✅ Clamp Description with Toggle */}
                            <ReadMoreText text={singleSolutioncontent.description} />
                        </div>

                        <div className='cursor-pointer bg-gradient-to-tl dark:from-[#ffffff70] dark:via-[#000] dark:to-[#ca3500] from-[#000] via-[#000] to-[#000] hover:via-[green] hover:from-[green] transition-all duration-300 ease-linear  mt-5 p-[1px] inline-flex rounded'>
                            <div className='dark:bg-black bg-white  p-3 rounded'>
                                <Link className='dark:text-gray-200 rounded-xl ' to={'/signUp'}>Get started for free</Link>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="solutionImg flex justify-center md:justify-center lg:justify-end relative order-0  md:order-0 lg:order-1"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        variants={featureVariant}
                        custom={1}
                    >
                        <img src={singleSolutioncontent.Image} className='w-xl h-auto' />
                        <BgblureShap className="sm:w-[400px] w-[300px] sm:h-[400px] h-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute blur-[200px] bg-gradient-to-r from-[#019196] dark:from-[#ff0ac2] to-[#00587a] dark:to-[#eb14ff] rounded-full z-[-1]" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default SingleSolution
