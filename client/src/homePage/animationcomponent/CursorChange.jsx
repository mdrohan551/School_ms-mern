import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorChange = () => {
    const [mousevalue, setMouseValue] = React.useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMoveMouse = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            setMouseValue({ x, y });
        };
        window.addEventListener('mousemove', handleMoveMouse);
        return () => {
            window.removeEventListener('mousemove', handleMoveMouse);
        };
    }, []);


    return (
        <motion.div
            animate={{
                x: mousevalue.x - 5,
                y: mousevalue.y - 5,
                transition: { type: 'spring', stiffness: 500, damping: 80 }
            }}
            className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] cursor-wrapper"
        >
            {/* Blur glow circle */}

        </motion.div>
    );
};

export default CursorChange;