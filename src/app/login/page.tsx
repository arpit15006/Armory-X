'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { countries } from '@/data/countries';

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();
    const [officerName, setOfficerName] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'checking' | 'granted' | 'denied'>('idle');

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) router.push('/');
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCountry || !accessCode || !officerName) return;

        setStatus('checking');

        // Simulate verification delay
        await new Promise((r) => setTimeout(r, 1500));

        const success = login(selectedCountry, accessCode, officerName);
        if (success) {
            setStatus('granted');
            await new Promise((r) => setTimeout(r, 2000));
            router.push('/');
        } else {
            setStatus('denied');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            <div className="absolute inset-0 tactical-grid opacity-20" />
            <div className="absolute inset-0 bg-radial-glow" />

            {/* Access Status Overlay */}
            <AnimatePresence>
                {(status === 'granted' || status === 'denied') && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-charcoal-950/90 backdrop-blur-sm" />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative z-10 text-center"
                        >
                            {status === 'granted' ? (
                                <>
                                    <div className="w-20 h-20 mx-auto mb-6 border-2 border-olive-500 rotate-45 flex items-center justify-center">
                                        <svg
                                            className="w-10 h-10 text-olive-400 -rotate-45"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold uppercase tracking-[0.3em] text-olive-400 mb-2">
                                        Access Granted
                                    </h2>
                                    <p className="text-xs font-heading uppercase tracking-[0.2em] text-charcoal-500">
                                        Identity Verified: {officerName}<br />
                                        Redirecting to command dossier...
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 mx-auto mb-6 border-2 border-red-600 rotate-45 flex items-center justify-center">
                                        <svg
                                            className="w-10 h-10 text-red-500 -rotate-45"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold uppercase tracking-[0.3em] text-red-500 mb-2">
                                        Unauthorized
                                    </h2>
                                    <p className="text-xs font-heading uppercase tracking-[0.2em] text-charcoal-500">
                                        Invalid credentials — access denied
                                    </p>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Login Form */}
            <div className="relative z-10 w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-6 border-2 border-olive-600 rotate-45 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-olive-500 -rotate-45"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-heading font-bold uppercase tracking-[0.3em] text-white mb-2">
                            Enter System
                        </h1>
                        <p className="text-xs font-heading uppercase tracking-[0.2em] text-charcoal-500">
                            Identity & Credentials Required
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
                        <div>
                            <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500 mb-2">
                                Officer Name
                            </label>
                            <input
                                type="text"
                                value={officerName}
                                onChange={(e) => setOfficerName(e.target.value)}
                                placeholder="Enter your name..."
                                className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-4 py-3 text-sm text-charcoal-200 font-body focus:border-olive-600 focus:outline-none focus:ring-1 focus:ring-olive-600/50 transition-colors placeholder:text-charcoal-600"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500 mb-2">
                                Country / Organization
                            </label>
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-4 py-3 text-sm text-charcoal-200 font-body focus:border-olive-600 focus:outline-none focus:ring-1 focus:ring-olive-600/50 transition-colors appearance-none"
                            >
                                <option value="">Select Country...</option>
                                {countries.map((c) => (
                                    <option key={c.code} value={c.code}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500 mb-2">
                                Access Code
                            </label>
                            <input
                                type="text"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                                placeholder="Enter access code..."
                                className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-4 py-3 text-sm text-charcoal-200 font-mono tracking-wider focus:border-olive-600 focus:outline-none focus:ring-1 focus:ring-olive-600/50 transition-colors placeholder:text-charcoal-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!selectedCountry || !accessCode || status === 'checking'}
                            className="w-full btn-primary py-3.5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'checking' ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                'Authenticate →'
                            )}
                        </button>

                        <div className="text-center pt-2">
                            <p className="text-[10px] text-charcoal-400 font-heading uppercase tracking-wider">
                                Hint: Select a country and use its access code
                            </p>
                            {selectedCountry && (
                                <p className="text-[10px] text-olive-600 font-mono mt-1">
                                    Code: {countries.find((c) => c.code === selectedCountry)?.accessCode}
                                </p>
                            )}
                        </div>
                        <div className="text-center pt-2 border-t border-charcoal-800/50">
                            <p className="text-[10px] text-charcoal-600 font-heading uppercase tracking-wider">
                                New personnel?{' '}
                                <Link href="/signup" className="text-olive-500 hover:text-olive-400 transition-colors">
                                    Register Here
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Classification */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-olive-900/30 rounded">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="text-[9px] font-heading uppercase tracking-[0.15em] text-charcoal-600">
                                Encrypted Connection Active
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
