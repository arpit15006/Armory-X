'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { UserProfile } from '@/types';

export default function WelcomeScreen() {
    const { auth } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Fade out elements as user scrolls down
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    const [displayName, setDisplayName] = React.useState("Operator");

    React.useEffect(() => {
        if (auth.isAuthenticated) {
            try {
                const storedProfile = localStorage.getItem('armory-x-profile');
                if (storedProfile) {
                    const profile: UserProfile = JSON.parse(storedProfile);
                    if (profile.officerName) {
                        setDisplayName(profile.officerName);
                    }
                } else {
                    setDisplayName(`Officer ${auth.country || 'X'}`);
                }
            } catch (e) {
                // ignore
            }
        }
    }, [auth.isAuthenticated, auth.country]);

    return (
        <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center snap-start">
            {/* Background elements */}
            <div className="absolute inset-0 bg-charcoal-950/70 z-0">
                <div className="absolute inset-0 tactical-grid opacity-20" />
                <div className="absolute inset-0 bg-radial-glow opacity-50" />
            </div>

            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 text-center px-4"
            >
                {/* Logo / Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-8 relative inline-block"
                >
                    <div className="w-24 h-24 border-2 border-olive-500/50 rotate-45 flex items-center justify-center animate-pulse-slow">
                        <div className="w-16 h-16 border border-olive-400 rotate-90" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-heading font-bold text-olive-500">X</span>
                    </div>
                </motion.div>

                {/* Status */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mb-4 flex items-center justify-center gap-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-olive-400">
                        System Online
                    </span>
                </motion.div>

                {/* Welcome Text */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-wider text-white mb-4">
                        Welcome, <span className="text-gradient">{displayName}</span>
                    </h1>
                    <p className="text-sm md:text-base font-heading uppercase tracking-[0.2em] text-charcoal-400 max-w-xl mx-auto leading-relaxed">
                        Authorized Personnel Detected<br />
                        <span className="text-olive-500 font-bold mt-2 inline-block">Clearance Level: Maximum</span>
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-32"
                >
                    <div className="flex flex-col items-center gap-4 animate-bounce">
                        <span className="text-xs md:text-sm font-heading uppercase tracking-widest text-charcoal-400 font-bold">
                            Scroll to Explore Inventory
                        </span>
                        <svg className="w-8 h-8 text-olive-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
