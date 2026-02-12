'use client';

import React from 'react';
import MotionWrapper from '@/components/MotionWrapper';

const techDecisions = [
    {
        label: 'Frontend Architecture',
        value: 'Next.js 14 // App Router // TypeScript',
        rationale: 'Server-side rendering framework selected for structured routing, type-safe development, and production-grade build tooling.',
    },
    {
        label: 'Design System',
        value: 'Tailwind CSS // Custom Tokens',
        rationale: 'Utility-first framework configured with a purpose-built color palette, typography scale, and component primitives.',
    },
    {
        label: 'Motion System',
        value: 'Framer Motion // HTML5 Canvas',
        rationale: 'Scroll-controlled frame-by-frame rendering provides engineering visualization without reliance on video playback or third-party media.',
    },
    {
        label: 'Authentication',
        value: 'Simulated // localStorage',
        rationale: 'Country-based access control is demonstrated at the interface level. No backend APIs or real credential systems are connected.',
    },
    {
        label: 'State Management',
        value: 'React Context // Persistence',
        rationale: 'Session state and user preferences are managed locally to replicate real system behavior within a frontend-only scope.',
    },
];

const socialLinks = [
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/arpitpatel150',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: 'https://github.com/arpit15006',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/arpitpatel_150/',
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-28 pb-16 relative">
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-charcoal-950" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(85,100,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(85,100,50,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/50 to-charcoal-950" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <MotionWrapper>
                    <div className="mb-12 border-b border-charcoal-800 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-0.5 bg-olive-600" />
                            <span className="text-[10px] font-heading uppercase tracking-[0.4em] text-olive-500">
                                System Documentation
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
                            Mission <span className="text-olive-500">Briefing</span>
                        </h1>
                    </div>
                </MotionWrapper>

                {/* ─── 1. Platform Overview ─── */}
                <MotionWrapper delay={0.05}>
                    <section className="mb-8 group">
                        <div className="relative bg-charcoal-900/60 backdrop-blur-md border border-charcoal-800 p-8 overflow-hidden transition-colors hover:border-olive-500/30">
                            {/* Decorative Grid */}
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-olive-500" />
                                    <div className="w-1 h-1 bg-olive-500" />
                                    <div className="w-1 h-1 bg-olive-500" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-1.5 h-1.5 bg-olive-500 rounded-sm" />
                                <h2 className="text-sm font-heading uppercase tracking-[0.2em] text-olive-400">
                                    Platform Overview
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-charcoal-300 leading-relaxed font-mono border-l-2 border-charcoal-700 pl-4">
                                    ARMORY-X is a frontend-only prototype designed to explore modern defense logistics
                                    and armory management interfaces.
                                </p>
                                <p className="text-sm text-charcoal-400 leading-relaxed">
                                    The platform provides a structured interface for viewing equipment inventories,
                                    technical specifications, operational readiness indicators, and logistics data.
                                    All content is presented through a design language informed by real-world defense
                                    information systems, emphasizing clarity, hierarchy, and operational context.
                                </p>
                            </div>
                        </div>
                    </section>
                </MotionWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ─── 2. Design Philosophy ─── */}
                    <MotionWrapper delay={0.1}>
                        <section className="h-full">
                            <div className="h-full bg-charcoal-900/40 backdrop-blur-sm border border-charcoal-800 p-6 hover:border-charcoal-600 transition-colors relative">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-olive-600/50 to-transparent" />

                                <h2 className="text-xs font-heading uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-olive-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                                    Design Philosophy
                                </h2>
                                <p className="text-xs text-charcoal-400 leading-relaxed mb-4">
                                    Principles of visual hierarchy, information density, and controlled interaction.
                                    Every element serves a functional purpose within the context of logistics communication.
                                </p>
                                <p className="text-xs text-charcoal-400 leading-relaxed">
                                    Motion supports comprehension rather than spectacle. Frame-by-frame canvas sequences
                                    replace static imagery for engineering visualization.
                                </p>
                            </div>
                        </section>
                    </MotionWrapper>

                    {/* ─── 3. Developer Attribution ─── */}
                    <MotionWrapper delay={0.15}>
                        <section className="h-full">
                            <div className="h-full bg-charcoal-900/40 backdrop-blur-sm border border-charcoal-800 p-6 hover:border-charcoal-600 transition-colors relative">
                                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-olive-600/50 to-transparent" />

                                <h2 className="text-xs font-heading uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-olive-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                    Personnel File
                                </h2>
                                <p className="text-xs text-charcoal-400 leading-relaxed mb-4">
                                    Architected by <strong className="text-olive-400 font-normal">Arpit Kumar Patel</strong>,
                                    Computer Science undergraduate at Parul University.
                                </p>
                                <p className="text-xs text-charcoal-400 leading-relaxed mb-6">
                                    Focus: Frontend engineering, motion-driven interface systems, and accessible design
                                    for information-dense platforms.
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-charcoal-800 border border-charcoal-700 rounded hover:bg-olive-600 hover:text-white hover:border-olive-500 transition-all duration-300 text-charcoal-400"
                                            title={link.label}
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </MotionWrapper>
                </div>

                {/* ─── 4. Technology & Constraints ─── */}
                <MotionWrapper delay={0.2}>
                    <section className="mt-8 mb-8">
                        <div className="bg-charcoal-900/30 border border-charcoal-800 p-8">
                            <h2 className="text-xs font-heading uppercase tracking-[0.2em] text-olive-500 mb-6">
                                System Architecture
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                {techDecisions.map((item) => (
                                    <div key={item.label} className="flex flex-col md:flex-row md:items-baseline md:justify-between p-3 border-b border-charcoal-800/50 hover:bg-charcoal-800/30 transition-colors">
                                        <div className="flex flex-col md:w-1/3">
                                            <span className="text-[10px] font-heading uppercase tracking-wider text-charcoal-500">
                                                {item.label}
                                            </span>
                                            <span className="text-xs font-mono text-olive-100">
                                                {item.value}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-charcoal-500 leading-relaxed md:w-1/2 md:text-right mt-1 md:mt-0">
                                            {item.rationale}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </MotionWrapper>

                {/* ─── Prototype Disclaimer ─── */}
                <MotionWrapper delay={0.25}>
                    <div className="border border-amber-900/30 bg-amber-900/5 p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-600/50" />
                        <h3 className="text-[10px] font-heading uppercase tracking-[0.2em] text-amber-500 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            Prototype Disclaimer
                        </h3>
                        <p className="text-[11px] text-charcoal-400 leading-relaxed font-mono">
                            ARMORY-X is a frontend-only demonstration prototype. No real data, backend services,
                            or actual defense infrastructure is connected.
                        </p>
                    </div>
                </MotionWrapper>

            </div>
        </div>
    );
}
