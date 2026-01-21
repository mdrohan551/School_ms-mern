import React from 'react';
import InstituteProfile from "../../../components/Dashboard/AdminDashboard/GeneralSettings/InstituteProfile/InstituteProfile.jsx";
import BgblureShap from "../../../homePage/animationcomponent/BgblureShap.jsx";

const InstituteProfilePage = () => {
    return (
      <div className="sm:py-5 sm:px-5 sm:mt-0 -mt-5  ">
            <div className="relative backdrop-blur-[8rem] dark:bg-gray-900/20 bg-gray-100/50 z-2  ">
                <InstituteProfile/>
            </div>
          <BgblureShap className="sm:w-60 w-80 sm:h-60 h-80 left-50 top-62 -translate-x-1/2 -translate-y-1/2 absolute    bg-gradient-to-r  dark:from-[#d919ffa2] dark:to-[#be00f82c] rounded-full z-1" />



          <BgblureShap className="sm:w-60 w-80 sm:h-60 h-80 -right-20 sm:bottom-0 hidden sm:block -translate-x-1/2 -translate-y-1/2 absolute    bg-gradient-to-r  dark:from-[#dc2aff54] dark:to-[#be00f82c] rounded-t-full z-1" />
      </div>
    );
};

export default InstituteProfilePage;