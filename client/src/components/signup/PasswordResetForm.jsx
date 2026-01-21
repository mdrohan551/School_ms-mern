import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';
import Input from './Input';
import { Mail } from 'lucide-react';




const PasswordResetForm = () => {
     /*--------------------------Managing FormSection---------------------- */
    // Manage form state
    const [formData, setFormData] = useState({ email: "" })
             
             
    // Set input value on onChange (handleChange)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
             
    // handle form onSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);    
    }

    return (
        < >
            <form onSubmit={handleSubmit} className='flex-center flex-col max-w-[90%] md:max-w-65 mx-auto pt-15'>
                <div className='max-w-[300px] mx-auto'>
                     <Input
                        type="email"
                        icon={Mail}
                        alt="Email Icon"
                        placeholder="Email Address"
                        inputStyle="w-[25px] group-focus-within:border-gray-100" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                     />
                </div>

                <Button 
                    style="
                    mt-7 px-16 py-2  
                    bg-teal-bright ease-linear  duration-200 
                    hover:shadow-lg hover:shadow-teal-white ">
                    Reset Password
                </Button>

                {/* Back to sign in page  */}
                <Link 
                to="/login"
                className='
                text-center text-gray-400 mt-6
                text-sm hover:text-teal-bright' 
            >Back to Sign in</Link>
            </form>
        </>
    );
};

export default PasswordResetForm;