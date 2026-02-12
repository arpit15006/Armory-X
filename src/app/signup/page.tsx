'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import { countries } from '@/data/countries';

export default function SignUpPage() {
    const router = useRouter();
    const { signup, isAuthenticated } = useAuth();
    const [officerName, setOfficerName] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'checking' | 'granted' | 'denied'>('idle');

    React.useEffect(() => {
        if (isAuthenticated) router.push('/');
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!officerName || !selectedCountry || !accessCode) return;

        setStatus('checking');
        await new Promise((r) => setTimeout(r, 1800));

        const success = signup(officerName, selectedCountry, accessCode);
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

            {/* Status Overlay */}
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
                                        <svg className="w-10 h-10 text-olive-400 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold uppercase tracking-[0.3em] text-olive-400 mb-2">
                                        Registration Complete
                                    </h2>
                                    <p className="text-xs font-heading uppercase tracking-[0.2em] text-charcoal-500">
                                        Identity Confirmed: {officerName}<br />
                                        Initializing command dossier...
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 mx-auto mb-6 border-2 border-red-600 rotate-45 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-red-500 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold uppercase tracking-[0.3em] text-red-500 mb-2">
                                        Registration Denied
                                    </h2>
                                    <p className="text-xs font-heading uppercase tracking-[0.2em] text-charcoal-500">
                                        Invalid credentials — verification failed
                                    </p>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Registration Form */}
            <div className="relative z-10 w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-6 border-2 border-olive-600 rotate-45 flex items-center justify-center">
                            <svg className="w-8 h-8 text-olive-500 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-heading font-bold uppercase tracking-[0.3em] text-white mb-2">
                            Personnel Registration
                        </h1>
                        <p className="text-xs font-heading uppercase tracking-[0.2em] text-charcoal-500">
                            New Officer Enrollment
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
                        <div>
                            <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500 mb-2">
                                Full Name / Callsign
                            </label>
                            <input
                                type="text"
                                value={officerName}
                                onChange={(e) => setOfficerName(e.target.value)}
                                placeholder="Enter officer name..."
                                required
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
                                required
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
                                required
                                className="w-full bg-charcoal-900 border border-charcoal-700 rounded px-4 py-3 text-sm text-charcoal-200 font-mono tracking-wider focus:border-olive-600 focus:outline-none focus:ring-1 focus:ring-olive-600/50 transition-colors placeholder:text-charcoal-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!officerName || !selectedCountry || !accessCode || status === 'checking'}
                            className="w-full btn-primary py-3.5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'checking' ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                'Register & Authenticate →'
                            )}
                        </button>

                        <div className="text-center pt-2 space-y-2">
                            <p className="text-[10px] text-charcoal-600 font-heading uppercase tracking-wider">
                                Hint: Select a country and use its access code
                            </p>
                            {selectedCountry && (
                                <p className="text-[10px] text-olive-600 font-mono">
                                    Code: {countries.find((c) => c.code === selectedCountry)?.accessCode}
                                </p>
                            )}
                            <div className="pt-2 border-t border-charcoal-800/50">
                                <p className="text-[10px] text-charcoal-600 font-heading uppercase tracking-wider">
                                    Already registered?{' '}
                                    <Link href="/login" className="text-olive-500 hover:text-olive-400 transition-colors">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>

                    {/* Classification */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-olive-900/30 rounded">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="text-[9px] font-heading uppercase tracking-[0.15em] text-charcoal-600">
                                Secure Registration Channel
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
