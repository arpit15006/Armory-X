'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MotionContextType {
    reducedMotion: boolean;
    toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
    reducedMotion: false,
    toggleMotion: () => { },
});

export const useMotion = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: React.ReactNode }) {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('armory-x-reduced-motion');
        if (stored === 'true') {
            setReducedMotion(true);
        }
        // Also respect OS preference
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches && stored === null) {
            setReducedMotion(true);
        }
    }, []);

    const toggleMotion = () => {
        const next = !reducedMotion;
        setReducedMotion(next);
        localStorage.setItem('armory-x-reduced-motion', String(next));
    };

    return (
        <MotionContext.Provider value={{ reducedMotion, toggleMotion }}>
            {children}
        </MotionContext.Provider>
    );
}
