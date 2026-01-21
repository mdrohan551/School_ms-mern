const BannerToolCard = ({ icon, title, des, color = "green", className = '' }) => (
  <div className={`${className} `}>
    <div className="flex sm:ring-[0.5px]
     ring-[0.5px] ring-gray-600 sm:ring-gray-50
      dark:ring-gray-50   backdrop-blur-3xl
       dark:bg-gray-600/5 bg-white 
         sm:rounded-xl
          rounded 
          shadow-md px-2 py-2  sm:px-6 sm:py-4 sm:w-70 w-30 max-w-sm mx-auto relative items-center sm:overflow-hidden">

      {/* Icon */}
      <div className={`flex items-center justify-center mr-2 z-10 w-3 lg:w-10 md:w-10`}>
        {icon}
      </div>
      {/* Text */}
      <div className="flex flex-col text-left z-10">
        <div className={`font-semibold text-[0.6rem] sm:text-[0.8rem]  text-${color}-600 dark:text-gray-300`} >{title}</div>
        <div className="text-gray-500 sm:block hidden dark:text-gray-300 text-[0.7rem] font-extralight">{des}</div>
      </div>
    </div>

  </div>
);

export default BannerToolCard;