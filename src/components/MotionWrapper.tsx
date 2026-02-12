'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '@/lib/MotionContext';

interface MotionWrapperProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export default function MotionWrapper({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: MotionWrapperProps) {
    const { reducedMotion } = useMotion();

    if (reducedMotion) {
        return <div className={className}>{children}</div>;
    }

    const directionMap = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { x: 30, y: 0 },
        right: { x: -30, y: 0 },
    };

    const offset = directionMap[direction];

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.div>
    );
}
