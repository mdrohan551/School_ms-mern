import React from 'react';
 
import LoginLayout from '../../Layouts/LoginLayout';
import PasswordResetForm from '../../components/signup/PasswordResetForm';


const ResetPassword = () => {
    return (
        <LoginLayout>
            <PasswordResetForm />
        </LoginLayout>
    );
};

export default ResetPassword;