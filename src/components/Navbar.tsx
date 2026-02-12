'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { useMotion } from '@/lib/MotionContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { isAuthenticated, logout } = useAuth();
    const { reducedMotion, toggleMotion } = useMotion();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'glass-panel shadow-lg shadow-black/20'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-olive-500 rotate-45 flex items-center justify-center group-hover:border-olive-400 transition-colors">
                            <span className="text-olive-400 font-heading font-bold text-xs md:text-sm -rotate-45">
                                AX
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm md:text-base font-heading font-bold tracking-[0.3em] text-white">
                                ARMORY-X
                            </span>
                            <span className="text-[8px] md:text-[10px] tracking-[0.2em] text-olive-500 uppercase">
                                Defense Logistics
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 text-xs font-heading uppercase tracking-[0.2em] transition-all duration-300 relative ${pathname === link.href
                                    ? 'text-olive-400'
                                    : 'text-charcoal-300 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-2 right-2 h-px bg-olive-500"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Auth */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/profile"
                                    className="px-3 py-1.5 text-xs font-heading uppercase tracking-wider text-olive-400 border border-olive-700 hover:border-olive-500 transition-colors rounded"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-3 py-1.5 text-xs font-heading uppercase tracking-wider text-charcoal-400 hover:text-red-400 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/signup"
                                    className="px-4 py-1.5 text-xs font-heading uppercase tracking-[0.15em] text-charcoal-300 hover:text-olive-400 border border-charcoal-700 hover:border-olive-600 transition-all duration-300 rounded"
                                >
                                    Register
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-4 py-1.5 text-xs font-heading uppercase tracking-[0.15em] bg-olive-700 hover:bg-olive-600 text-white border border-olive-600 transition-all duration-300 rounded"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-charcoal-300 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-panel border-t border-olive-900/30 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-4 py-2.5 text-sm font-heading uppercase tracking-wider rounded ${pathname === link.href
                                        ? 'text-olive-400 bg-olive-900/20'
                                        : 'text-charcoal-300 hover:text-white hover:bg-charcoal-800/50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="border-olive-900/30" />
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2.5 text-sm font-heading uppercase tracking-wider text-olive-400"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2.5 text-sm font-heading uppercase tracking-wider text-charcoal-400"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        href="/signup"
                                        className="block px-4 py-2.5 text-sm font-heading uppercase tracking-wider text-charcoal-300 hover:text-white hover:bg-charcoal-800/50 rounded"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="block px-4 py-2.5 text-sm font-heading uppercase tracking-wider text-olive-400"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
