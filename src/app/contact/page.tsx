'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import MotionWrapper from '@/components/MotionWrapper';

export default function ContactPage() {
    const { auth } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', organization: '', subject: '', message: '' });
    const [priority, setPriority] = useState('routine');
    const [isTransmitting, setIsTransmitting] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('armory-x-profile');
            if (stored) {
                const profile = JSON.parse(stored);
                setForm(prev => ({
                    ...prev,
                    name: profile.officerName || '',
                    organization: profile.country || ''
                }));
            }
        } catch (e) {
            // ignore
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsTransmitting(true);

        // Simulate encrypting and sending
        setTimeout(() => {
            setIsTransmitting(false);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
            setForm(prev => ({ ...prev, subject: '', message: '' }));
            setPriority('routine');
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-28 pb-16 relative">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-charcoal-950" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-950 via-charcoal-950/80 to-charcoal-900/50" />
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <MotionWrapper>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-charcoal-800 pb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-0.5 bg-olive-600" />
                                <span className="text-[10px] font-heading uppercase tracking-[0.4em] text-olive-500">
                                    Secure Channel
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
                                Command <span className="text-olive-500">Uplink</span>
                            </h1>
                        </div>
                        {auth.accessCode && (
                            <div className="px-3 py-1 bg-olive-900/10 border border-olive-500/20 rounded backdrop-blur-sm">
                                <span className="text-[10px] font-heading uppercase tracking-wider text-olive-400">
                                    Clearance: {auth.accessCode} / Verified
                                </span>
                            </div>
                        )}
                    </div>
                </MotionWrapper>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-charcoal-900/50 border border-olive-500/30 p-12 text-center backdrop-blur-md relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-olive-500/5 animate-pulse-slow" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 border border-olive-500 rounded-full flex items-center justify-center relative">
                                        <div className="absolute inset-0 border border-olive-500 rounded-full animate-ping opacity-20" />
                                        <svg className="w-8 h-8 text-olive-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold uppercase tracking-[0.2em] text-white mb-2">Transmission Logged</h2>
                                    <p className="text-xs text-charcoal-400 font-mono tracking-wider mb-6">
                                        REF-ID: <span className="text-olive-500">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                    </p>
                                    <div className="w-full max-w-sm bg-black/40 p-4 rounded border border-charcoal-800 text-left">
                                        <p className="text-[10px] font-mono text-green-500">$ encrypt_packet --target=command_hq</p>
                                        <p className="text-[10px] font-mono text-green-500">$ status: verified</p>
                                        <p className="text-[10px] font-mono text-green-500">$ timestamp: {new Date().toISOString()}</p>
                                        <p className="text-[10px] font-mono text-green-500 animate-pulse">$ awaiting_response...</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <MotionWrapper delay={0.1} key="form">
                                <form onSubmit={handleSubmit} className="bg-charcoal-900/30 backdrop-blur-md border border-charcoal-800 p-8 md:p-10 relative group">
                                    {/* Corners */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-charcoal-600 group-hover:border-olive-500 transition-colors duration-500" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-charcoal-600 group-hover:border-olive-500 transition-colors duration-500" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-charcoal-600 group-hover:border-olive-500 transition-colors duration-500" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-charcoal-600 group-hover:border-olive-500 transition-colors duration-500" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500">Officer Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="w-full bg-transparent border-b border-charcoal-700 py-3 text-sm text-white font-mono focus:border-olive-500 focus:outline-none transition-all placeholder:text-charcoal-700"
                                                placeholder="ENTER NAME"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500">Unit / Org</label>
                                            <input
                                                type="text"
                                                required
                                                value={form.organization}
                                                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                                                className="w-full bg-transparent border-b border-charcoal-700 py-3 text-sm text-white font-mono focus:border-olive-500 focus:outline-none transition-all placeholder:text-charcoal-700"
                                                placeholder="ENTER UNIT"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                        <div className="md:col-span-2 space-y-4">
                                            <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500">Subject</label>
                                            <input
                                                type="text"
                                                required
                                                value={form.subject}
                                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                                className="w-full bg-transparent border-b border-charcoal-700 py-3 text-sm text-white font-mono focus:border-olive-500 focus:outline-none transition-all placeholder:text-charcoal-700"
                                                placeholder="BRIEF DESCRIPTION"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500">Priority</label>
                                            <div className="relative">
                                                <select
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.target.value)}
                                                    className="w-full bg-charcoal-900/50 border border-charcoal-700 rounded px-4 py-3 text-xs font-mono text-charcoal-200 focus:border-olive-500 focus:outline-none transition-colors appearance-none cursor-pointer uppercase tracking-wider"
                                                >
                                                    <option value="routine">Routine</option>
                                                    <option value="priority">Priority</option>
                                                    <option value="immediate">Immediate</option>
                                                    <option value="flash">Flash Override</option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <div className={`w-2 h-2 rounded-full ${priority === 'routine' ? 'bg-blue-500' : priority === 'priority' ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <label className="block text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500">Message Payload</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            className="w-full bg-charcoal-900/30 border border-charcoal-700 rounded p-4 text-sm text-charcoal-200 font-mono leading-relaxed focus:border-olive-500 focus:outline-none resize-none transition-colors placeholder:text-charcoal-700"
                                            placeholder="// ENTER ENCRYPTED MESSAGE CONTENT..."
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-charcoal-800">
                                        <div className="flex items-center gap-3 px-4 py-2 bg-charcoal-950/50 border border-charcoal-800 rounded">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow" />
                                            <span className="text-[9px] font-heading uppercase tracking-[0.15em] text-charcoal-400">
                                                Encryption: <span className="text-green-500">AES-256-GCM</span>
                                            </span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isTransmitting}
                                            className="w-full md:w-auto px-8 py-3 bg-olive-600 hover:bg-olive-500 text-white text-xs font-heading uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <span className={`relative z-10 flex items-center gap-2 justify-center ${isTransmitting ? 'animate-pulse' : ''}`}>
                                                {isTransmitting ? 'Transmitting...' : 'Initialize Uplink'}
                                                {!isTransmitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </MotionWrapper>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
