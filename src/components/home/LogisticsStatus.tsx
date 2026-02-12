'use client';

import React from 'react';
import MotionWrapper from '@/components/MotionWrapper';

const readinessData = [
    { label: 'Firearms Systems', value: 94, color: 'bg-olive-500' },
    { label: 'Armored Vehicles', value: 87, color: 'bg-teal-500' },
    { label: 'Field Equipment', value: 98, color: 'bg-olive-400' },
    { label: 'Supply Chain', value: 91, color: 'bg-amber-500' },
];

const statusItems = [
    { label: 'Inventory Sync', status: 'Active', dot: 'bg-green-500' },
    { label: 'Logistics Network', status: 'Online', dot: 'bg-green-500' },
    { label: 'Maintenance Queue', status: '3 Pending', dot: 'bg-amber-500' },
    { label: 'Allocation Requests', status: '7 Active', dot: 'bg-blue-500' },
];

export default function LogisticsStatus() {
    return (
        <section className="relative py-24 md:py-32 bg-charcoal-950 overflow-hidden">
            <div className="absolute inset-0 tactical-grid opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-800/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <MotionWrapper>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-px bg-olive-600" />
                        <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-olive-500">
                            Logistics Dashboard
                        </span>
                    </div>
                    <h2 className="section-heading text-white mb-12">
                        Operational <span className="text-gradient">Readiness</span>
                    </h2>
                </MotionWrapper>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Readiness Bars */}
                    <MotionWrapper delay={0.1}>
                        <div className="card p-6">
                            <h3 className="text-xs font-heading uppercase tracking-[0.2em] text-olive-500 mb-6">
                                Category Readiness
                            </h3>
                            <div className="space-y-5">
                                {readinessData.map((item) => (
                                    <div key={item.label}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-heading uppercase tracking-wider text-charcoal-300">
                                                {item.label}
                                            </span>
                                            <span className="text-xs font-heading text-olive-400">
                                                {item.value}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-charcoal-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                                                style={{ width: `${item.value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Status Grid */}
                    <MotionWrapper delay={0.2}>
                        <div className="card p-6">
                            <h3 className="text-xs font-heading uppercase tracking-[0.2em] text-olive-500 mb-6">
                                System Status
                            </h3>
                            <div className="space-y-4">
                                {statusItems.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center justify-between py-3 border-b border-charcoal-800/50 last:border-0"
                                    >
                                        <span className="text-xs font-heading uppercase tracking-wider text-charcoal-300">
                                            {item.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.dot} animate-pulse-slow`} />
                                            <span className="text-[10px] font-heading uppercase tracking-wider text-charcoal-400">
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-charcoal-900/50 rounded border border-charcoal-800/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-olive-500 animate-pulse-slow" />
                                    <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500">
                                        Last Updated
                                    </span>
                                </div>
                                <span className="text-xs text-charcoal-400 font-mono">
                                    {new Date().toISOString().split('T')[0]} — 00:00 UTC
                                </span>
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        </section>
    );
}
