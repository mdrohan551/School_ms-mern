import { Award } from "lucide-react";  // ভুলে গেলে ইমপোর্ট করবে না

const Winner = () => {
    return (
        <div className="relative hidden sm:flex flex-col items-center -top-7 -right-50 z-20">
            {/* Ribbon */}
            <svg
                width="28"
                height="80"
                viewBox="0 0 28 80"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg z-10 rounded"
            >
                <polygon points="0,0 28,0 28,68 14,80 0,68"   className="fill-orange-400 dark:fill-amber-700 " />
                <text
                    x="14"
                    y="25"
                    fontSize="10"
                    fontWeight="bold"
                    fill="white"
                    textAnchor="middle"
                    transform="rotate(90, 14, 40)"
                >
                    TOP
                </text>
            </svg>

            {/* Triangle */}
            <svg
                width="12"
                height="12"
                viewBox="0 0 10 10"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -top-0 -left-2 rotate-180 z-0"
            >
                <polygon points="0,10 10,0 0,0" className="fill-orange-800 opacity-70" />
            </svg>
            {/*<Award className="w-5 h-5 text-gray-700" />*/}
            {/* Award Icon */}
            <div className="absolute top-3 text-[0.7rem] text-white right-1.3 z-30  bg-opacity-50  ">
                T<br/>
                O<br/>
                P
            </div>
        </div>
    );
};

export default Winner;
