import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ style, href, children}) => {
    
    const renderButton = () => (
        <button 
            className={`text-white rounded-full cursor-pointer ${style}`} 
            type='submit'>
                 {children}
        </button>
    )

    const renderLink = () => (
        <Link to={`${href}`} className={`text-white rounded-full cursor-pointer ${style}`}>
                 {children}
        </Link>
    )


    return href ? renderLink() : renderButton();
};

export default Button;