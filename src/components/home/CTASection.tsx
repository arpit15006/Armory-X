'use client';

import React from 'react';
import Link from 'next/link';
import MotionWrapper from '@/components/MotionWrapper';

export default function CTASection() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-olive-950/20 to-charcoal-950" />
            <div className="absolute inset-0 tactical-grid opacity-10" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-800/40 to-transparent" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <MotionWrapper>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-px bg-olive-600" />
                        <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-olive-500">
                            Authorized Access
                        </span>
                        <div className="w-8 h-px bg-olive-600" />
                    </div>
                </MotionWrapper>

                <MotionWrapper delay={0.1}>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-wider text-white mb-6">
                        Ready for{' '}
                        <span className="text-gradient">Deployment</span>
                    </h2>
                    <p className="text-charcoal-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Access the full inventory management system with detailed engineering specifications,
                        logistics tracking, and allocation request capabilities for authorized personnel.
                    </p>
                </MotionWrapper>

                <MotionWrapper delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/login" className="btn-primary">
                            Request Access →
                        </Link>
                        <Link href="/inventory" className="btn-secondary">
                            Browse Inventory
                        </Link>
                    </div>
                </MotionWrapper>

                {/* Decorative Elements */}
                <div className="mt-16 flex items-center justify-center gap-8">
                    {['ENCRYPTED', 'VERIFIED', 'AUTHORIZED'].map((label, i) => (
                        <MotionWrapper key={label} delay={0.3 + i * 0.1}>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-olive-600" />
                                <span className="text-[9px] font-heading uppercase tracking-[0.2em] text-charcoal-600">
                                    {label}
                                </span>
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
