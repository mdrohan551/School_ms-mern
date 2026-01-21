import React from 'react';
import {Link} from "react-router-dom";

const NotfoundPage = () => {
    return (


        <div className=" text-center bg-black ">
            <div className="flex justify-center items-center w-full h-100 container mx-auto ">

                <span className="sm:text-5xl text-2xl text-indigo-400">   <span className="text-red-600">404</span> | Page Not Found</span>
            </div>
            <Link to={'/'} className="text-white font-bold py-3 px-5 bg-indigo-400 rounded-xl ">Back</Link>

        </div>
    );
};

export default NotfoundPage;