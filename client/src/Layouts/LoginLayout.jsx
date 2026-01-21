import React from 'react';
import { Link } from 'react-router-dom';
import { CircleHelp } from 'lucide-react';
import Button from '../components/signup/Button';
import DarkMoodButton from '../homePage/HomeNav/DarkMoodButton';


const LoginLayout = ({ children }) => {
    return (
        <section className='w-full bg-white dark:bg-black'>
            <div className="grid grid-cols-12 h-auto sm:min-h-screen">
                {/* ------------------------------Left Side------------------------------  */}
                <div className='col-span-12 md:col-span-7'>
                    <div className='flex flex-col gap-5 items-center md:max-w-65 mx-auto pb-5 pt-14'>
                        <Link to='/'>
                            <img src="../../public/images/whitelogo.png" className="w-30 max-w-30 mix-blend-difference" alt={""}/>
                        </Link>

                        <Link
                            to='/signup'
                            className='
                            text-gray-500  dark:text-gray-50
                            font-semibold 
                            text-[0.9rem] 
                            hover:text-teal-bright'
                        >
                            <CircleHelp className="w-5 inline-block mr-1 opacity-100" />
                            I do not have an account yet
                        </Link>
                    </div>
                    {/* -----------This is Layout Children (FormSection)--------- */}
                    {
                        children
                    }
                </div>
                {/* ------------------------------Right Side------------------------------  */}
                <div className="bg-junglegreen-darken hidden md:col-span-5 md:flex md:flex-col md:justify-center px-2" >
                    <DarkMoodButton className='fixed top-10 right-10 p-1 dark:bg-gray-600 rounded-xl cursor-grabbing bg-white dark:text-white' />
                    <div className='flex flex-col gap-5 items-center pt-20'>
                        <h2 className='text-3xl text-white font-semibold'>Start managing now</h2>
                        <p className='text-[16px] text-center text-white leading-7 max-w-md'>Stop struggling with common tasks and focus on the real choke points. Discover a full featured & 100% Free School management platform.</p>
                        <Button href='/' style="border-2 font-semibold px-7 py-2 hover:bg-white hover:text-black hover:border-white ease-linear duration-200" >
                            Get started
                        </Button>
                    </div>
                    <img
                        className='max-w-[20rem] mx-auto'
                        src="images/login.webp"
                        alt="Login image"
                    />
                </div>
            </div>
        </section>
    );
};

export default LoginLayout;