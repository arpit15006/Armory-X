import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative border-t border-olive-900/30 bg-charcoal-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 border-2 border-olive-600 rotate-45 flex items-center justify-center">
                                <span className="text-olive-500 font-heading font-bold text-xs -rotate-45">
                                    AX
                                </span>
                            </div>
                            <span className="font-heading font-bold tracking-[0.3em] text-white">
                                ARMORY-X
                            </span>
                        </div>
                        <p className="text-sm text-charcoal-400 max-w-sm leading-relaxed">
                            Defense Logistics & Armory Management Platform. Engineering transparency
                            and inventory visualization for authorized national representatives.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-olive-500 animate-pulse-slow" />
                            <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-olive-600">
                                Systems Operational
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-heading uppercase tracking-[0.2em] text-olive-500 mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Inventory', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-sm text-charcoal-400 hover:text-olive-400 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Access */}
                    <div>
                        <h4 className="text-xs font-heading uppercase tracking-[0.2em] text-olive-500 mb-4">
                            Access
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/login"
                                    className="text-sm text-charcoal-400 hover:text-olive-400 transition-colors"
                                >
                                    Secure Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/profile"
                                    className="text-sm text-charcoal-400 hover:text-olive-400 transition-colors"
                                >
                                    Command Dossier
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-olive-900/20 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-heading uppercase tracking-[0.15em] text-charcoal-600">
                            © 2026 ARMORY-X Platform
                        </span>
                        <span className="text-[10px] font-heading uppercase tracking-[0.15em] text-charcoal-700">
                            Frontend Prototype — No Real Data
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-olive-900/30 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-[10px] font-heading uppercase tracking-[0.15em] text-charcoal-500">
                            Classification: UNCLASSIFIED // PROTOTYPE
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
