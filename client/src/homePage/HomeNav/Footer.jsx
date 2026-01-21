import { MessageSquareMore } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <section className='dark:bg-[#06143B] bg-[#fff] text-white'>
      <div className=" pt-10 sm:pt-1 ">
        <div className="max-w-[1440px] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 sm:gap-8">

          {/* Logo & Description */}
          <div className="sm:space-y-4 sm:text-center text-left md:text-left col-span-10 sm:col-span-1 mb-10 sm:mb-0">
            <div className="flex justify-start sm:justify-center md:justify-start items-center space-x-2">
              <img src="../../../public/images/whitelogo.png" alt="Logo" className="w-40 mix-blend-difference  h-auto object-contain" />
            </div>
            <p className="text-sm dark:text-gray-300 text-gray-700 mt-5 sm:mt-0">
              eSkooly is the world's best and #1 ranked free online school
              management software. Our school management software has more features
              than any school software in the market.
            </p>

          </div>

          {/* Menu: ESKOOLY */}
          <div className="flex flex-col sm:items-center items-start md:items-center text-center">
            <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-200">ESKOOLY</h3>
            <ul className="space-y-2 text-sm text-start sm:text-center text-gray-700 dark:text-gray-300 ">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Get started</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>

          {/* Menu: TERMS */}
          <div className="flex flex-col sm:items-center md:items-end text-center md:text-right">
            <h3 className="font-semibold mb-0 sm:mb-3 text-gray-700 dark:text-gray-200">TERMS</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 text-start sm:text-center">
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy policy</a></li>
              <li><a href="#" className="hover:underline">SaaS services</a></li>
            </ul>
          </div>
        </div>

        {/* Floating Buttons */}
        <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50">
          <button
            className="cursor-pointer w-10 h-10 rounded-full bg-[#ca3500]  flex items-center justify-center shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="w-12 h-12 cursor-not-allowed rounded-full bg-[#7A3CFB] hover:bg-purple-700 flex items-center justify-center shadow-lg">
            <MessageSquareMore className="text-white" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-400 pt-2 text-center p-4 pb-15">
        Copyright © 2025 eSkooly (MERN Team from ostad) - All rights reserved.
      </p>

    </section>
  );
};

export default Footer;
