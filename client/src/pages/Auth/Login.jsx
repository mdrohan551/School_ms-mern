import React, { useEffect, useState } from 'react';
import HomeLoader from '../../homePage/homePageLoader/HomeLoader';
import LoginLayout from '../../Layouts/LoginLayout';
import LoginForm from '../../components/signup/LoginForm';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlideOut(true), 2000);
    const timer2 = setTimeout(() => setLoading(false), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  if (loading) {
    return (
      <div className={`fixed inset-0 z-[9999] transition-transform duration-500 ${slideOut ? '-translate-y-full' : 'translate-y-0'}`}>
        <HomeLoader />
      </div>
    );
  }

  return (
    // Layout System: Login FormSection wraped by LoginLayout.jsx Layout system
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;