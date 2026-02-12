'use client';

import React from 'react';
import MotionWrapper from '@/components/MotionWrapper';

const stats = [
    { label: 'Active Platforms', value: '7', suffix: '' },
    { label: 'Units Tracked', value: '59,610', suffix: '+' },
    { label: 'Operational Rate', value: '97.3', suffix: '%' },
    { label: 'Nations Integrated', value: '12', suffix: '' },
];

export default function AboutSection() {
    return (
        <section className="relative py-24 md:py-32 bg-charcoal-950 overflow-hidden">
            <div className="absolute inset-0 tactical-grid opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-800/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <MotionWrapper>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-olive-600" />
                        <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-olive-500">
                            Platform Overview
                        </span>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    <MotionWrapper delay={0.1}>
                        <h2 className="section-heading text-white mb-6">
                            Engineering{' '}
                            <span className="text-gradient">Transparency</span>
                            <br />
                            at Every Level
                        </h2>
                        <p className="text-charcoal-400 leading-relaxed mb-6">
                            ARMORY-X provides authorized defense personnel with comprehensive
                            visibility into equipment inventory, engineering specifications, and
                            logistics readiness. Our platform prioritizes clarity, precision, and
                            operational awareness.
                        </p>
                        <p className="text-charcoal-400 leading-relaxed">
                            Through advanced visualization technologies including scroll-controlled
                            engineering views and detailed specification panels, commanders gain
                            unprecedented insight into their asset ecosystem.
                        </p>
                    </MotionWrapper>

                    <MotionWrapper delay={0.2}>
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="card p-6 text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-heading font-bold text-olive-400 mb-2">
                                        {stat.value}
                                        <span className="text-olive-600">{stat.suffix}</span>
                                    </div>
                                    <div className="text-[10px] font-heading uppercase tracking-[0.2em] text-charcoal-500">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
