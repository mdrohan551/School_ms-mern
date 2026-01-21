import React, { useEffect, useState } from 'react';
import HomeLoader from './homePageLoader/HomeLoader';
import HomeNav from "./HomeNav/HomeNav.jsx";
import HomeBanner from "./HomeBanner/HomeBanner.jsx";
import FeaturesOfSchool from './FeaturesOfSchool.jsx';
import WhyChoose from './WhyChoose.jsx';
import AllFeatures from './AllFeatures.jsx';
import SingleSolution from './SingleSolution.jsx';
import Lenis from '@studio-freight/lenis';
import Footer from './HomeNav/Footer.jsx';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll Init
    const lenis = new Lenis({
      duration: 1.2, // smooth scroll duration
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // ease-out
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

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
    <div>
      <HomeNav />
      <HomeBanner />
      <FeaturesOfSchool />
      <WhyChoose />
      <AllFeatures />
      <SingleSolution />
      <Footer/>
    </div>
  );
};

export default HomePage;
