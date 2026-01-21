import React from 'react'
import {
    Landmark,
    Loader,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { allFeatures } from '../constant/HomePageData';
import BgblureShap from './animationcomponent/bgBlureShap';
const featureVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 1, type: 'spring' }
    }),
};
const AllFeatures = () => {
    if (allFeatures.length === 0) {
        return <Loader />
    }
    else {
        return (
            <section className='dark:bg-black overflow-hidden'>
                <div className='max-w-[1440px] mx-auto px-4 py-10 sm:py-30 relative z-0 '>
                    <div className="text-center mb-10">
                        <motion.h1 className='text-2xl  sm:text-4xl nexabold-font uppercase bg-gradient-to-l from-[#0c0000] via-[#3b3b3b] to-[#fff] dark:from-[#ffffff8a] dark:via-[#ffffffde] dark:to-[#8d8d8daf] inline-block rounded p-3 sm:p-5 bg-clip-text text-transparent'>
                            All Features in one place
                        </motion.h1>
                    </div>
                    <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 relative z-[1] pointer-events-none ">
                        {
                            // Array.from({ length: 10 }).map((_, index) => ())
                            allFeatures.map((item, index) => (
                                <motion.div
                                    key={item.title} // ✅ better than index
                                    initial={featureVariant.hidden}
                                    whileInView='visible'
                                    custom={index}
                                    variants={featureVariant}
                                    className="  order-1 sm:order-2 relative rounded-xl p-[1px] bg-gradient-to-br dark:from-[#ca3500] from-[#ffffff96] dark:via-[#0c0c0c94] via-[#0000005b] dark:to-[#ffffff6c] to-[#fff] shadow-xl ">
                                    <div className=" px-3 py-10 flex flex-col items-center dark:bg-[#02001aee] bg-[#fff] rounded-xl gap-4">
                                        <span className='dark:text-gray-400'><item.icon /></span>
                                        <h1 className='dark:text-white text-2xl'>{item.title}</h1>
                                        <p className='dark:text-white text-[0.8rem] text-center'>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))
                        }
                        <BgblureShap className="sm:w-[400px] w-[300px] sm:h-[400px] h-[300px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute blur-[250px] bg-gradient-to-r from-[#949494e5] dark:from-[#ca3500] to-[#838383e8] dark:to-[#ca3500] rounded-full z-[-1]" />
                    </div>

                    <div className='bg-[#ffffff00] dark:bg-black/80 blur-[7rem] w-full h-100 z-10 absolute -bottom-5 hover:opacity-0 hover:z-0 duration-300  transition-all ease-linear'></div>
                </div>

            </section>
        )
    }
}
export default AllFeatures