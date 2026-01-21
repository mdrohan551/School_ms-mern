import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MouseHover = ({ hovercss }) => {
    const imgRef = useRef();

    useEffect(() => {
        // প্রতিবার ইমেজ পরিবর্তন হলে আগের gsap animation বন্ধ করে দাও
        gsap.killTweensOf(imgRef.current);
        gsap.set(imgRef.current, { y: '0%' });

        if (hovercss.display === 'block' && hovercss.websiteImg) {
            gsap.to(imgRef.current, {
                y: '-50%',
                duration: 10,
                ease: 'linear',
                repeat: -1,
                yoyo: true,
            });
        }
    }, [hovercss.websiteImg]);


    return (
        <div
            className={`
                ${hovercss.display === 'block' ? 'block' : 'hidden'}
                w-[200px] h-[200px]
                sm:w-[150px] sm:h-[150px]
                md:w-[350px] md:h-[350px]
                overflow-hidden relative border-1 border-red-500 rounded-xl
            `}
        >
            <img
                ref={imgRef}
                src={hovercss.websiteImg}
                alt="Scrolling Website"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                
                    objectFit: 'cover',
                }}
            />
        </div>
    );
};

export default MouseHover;
