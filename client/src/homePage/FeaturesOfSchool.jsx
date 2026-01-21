import React from 'react';
import { FeaturesOfSchoolData, HomePageData } from '../constant/HomePageData';
import { motion } from 'framer-motion';
import BgblureShap from './animationcomponent/bgBlureShap';

const { title, description, SubFeatureDataRight, SubFeatureDataLeft } = FeaturesOfSchoolData;
const { mobile1,phoneVidoe2 } = HomePageData.homeBanner.BannerImg;

// Add icons to all features (lucide-react)


// Animation variants
const featureVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.5, duration: 0.7, type: 'spring' }
  }),
};

const FeaturesOfSchool = () => {
  return (
    <div className='-mt-10 md:-mt-24 lg:-mt-49 relative  bg-gradient-to-r from-[#00000000] to-[#ffffff00] dark:from-[#09327f] dark:to-[#06183b]'>
      <div className="rotate-180  ">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 122.3">
          <path
            className="fill-[#a3c0ff41] dark:fill-[#00000075] "
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          />
        </svg>
      </div>

      <section className={`sm:py-20 py-10 sm:-mt-[0.0rem] -mt-[0.1rem] bg-[#a3c0ff41] dark:bg-[#00000075]  overflow-y-hidden relative  `} id='featureSection'>
        <div className="max-w-[1440px] container mx-auto px-4 flex flex-col items-center ">
          <div className='featureText  text-justify sm:text-center'>
            <h1 className=' sm:pt-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent sm:text-5xl text-sm nexabold-font px-4 sm:px-20  '>{title}</h1>
            <p className='popins-font text-gray-900 dark:text-gray-100 font-light sm:text-sm text-[0.6rem] sm:mt-5 mt-2 px-4 md:px-20 '>{description}</p>
          </div>
          <div className={`featureDetails w-full flex flex-col  md:flex-row justify-center items-center mt-16 relative  `} >
            {/* Left Features */}
            <div className="flex flex-col sm:gap-16 gap-5 flex-1 items-end z-10 pointer-events-none">
              {SubFeatureDataLeft.map((item, idx) => (
                <motion.div
                  key={idx}
                  className=" "
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }} // এখানে once: false
                  custom={idx}
                  variants={featureVariant}
                >
                  <div className="relative rounded-xl p-[1px] bg-gradient-to-br from-[#00000073] via-[#fff] to-[#00000073] dark:from-[#03030393] dark:via-[#ca3500] dark:to-[#0c0c0cd2] shadow-xl group transition-all duration-500 delay-500 ease-linear  hover:via-[#00745a]">
                    <div className="rounded-xl dark:bg-[#181818] bg-[#fffffff1] sm:p-6 p-3 flex  items-end gap-5">

                      <div className="flex flex-col">
                        <h2 className="dark:text-gray-200 text-gray-800 sm:text-2xl text-sm nexabold-bold uppercase">{item.title}</h2>

                        <p className=" text-[0.6rem] sm:text-[0.7rem] mt-2 dark:text-gray-200 text-gray-800 ">{item.description}</p>
                      </div>
                      <span className=" p-2 rounded-full shadow-lg mb-3 border-1 border-[#f15b5b] text-[#000] dark:text-gray-200 text-4xl flex items-center justify-center self-end">
                        {React.createElement(item.icon, { size: 20 })}
                      </span>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
            {/* Center Phone Image */}
            <motion.div
              className="absolute sm:static  flex justify-center items-center mx-8 my-12 md:my-0  "
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <BgblureShap className="sm:w-150 w-80 sm:h-150 h-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute blur-[150px] dark:blur-[200px]   bg-gradient-to-r
               from-[#c2d5ff48] dark:from-[#af03ff91] to-[#0650f0be] dark:to-[#7b13f1bb]  rounded-full z[-9]" />
              <img
                src={mobile1}
                alt="eSkooly App"
                className="w-[320px] sm: md:w-[250px] lg:w-[300px] rounded-xl shadow-2xl opacity-20 sm:opacity-100  rotate-x-0 hidden dark:block"
                style={{ zIndex: 1 }}
              />
              <video
                src={phoneVidoe2}
                className='w-80 mix-blend-multiply dark:hidden block rounded-3xl'
                autoPlay
                loop
                muted
              ></video>
    
            </motion.div>

            <div className='pt-5 block sm:hidden'></div>
            {/* Right Features */}
            <div className="flex flex-col sm:gap-16 gap-5 flex-1 items-end z-10 pointer-events-none">
              {SubFeatureDataRight.map((item, idx) => (
                <motion.div
                  key={idx}
                  className=" "
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }} // এখানে once: false
                  custom={idx}
                  variants={featureVariant}
                >
                  <div className="relative rounded-xl p-[1px] bg-gradient-to-br dark:from-[#ca3500] from-[#fff]  dark:via-[#0c0c0c94] via-[#0000005b] dark:to-[#ca3500] to-[#fff] shadow-xl group transition-all duration-500 delay-500 ease-linear  hover:via-[#00745a]">
                    <div className="rounded-xl dark:bg-[#181818] bg-[#fffffff1] sm:p-6 p-3 flex  items-end gap-5 sm:text-right text-left">
                      <span className=" p-2 rounded-full shadow-lg mb-3 border-1 border-[#f15b5b] text-[#000] dark:text-gray-200 text-4xl flex items-center justify-center self-end">
                        {React.createElement(item.icon, { size: 20 })}
                      </span>
                      <div className="flex flex-col">
                        <h2 className="dark:text-gray-200 text-gray-800 sm:text-2xl text-sm nexabold-bold uppercase">{item.title}</h2>

                        <p className="dark:text-gray-200 text-gray-800 text-[0.6rem] sm:text-[0.7rem] mt-2 ">{item.description}</p>
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className=' dark:bg-black/80 blur-[7rem] w-full h-100 z-10 absolute -bottom-5 hover:opacity-0 hover:z-0 duration-300  transition-all ease-linear'></div>
      </section>




    </div>
  );
};

export default FeaturesOfSchool;