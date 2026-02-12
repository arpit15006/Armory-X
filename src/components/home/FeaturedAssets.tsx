'use client';

import React from 'react';
import Link from 'next/link';
import { assets } from '@/data/assets';
import MotionWrapper from '@/components/MotionWrapper';

export default function FeaturedAssets() {
    const featured = assets.slice(0, 4);

    return (
        <section className="relative py-24 md:py-32 bg-charcoal-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-950/95 to-charcoal-950" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-olive-800/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <MotionWrapper>
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-px bg-olive-600" />
                                <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-olive-500">
                                    Asset Registry
                                </span>
                            </div>
                            <h2 className="section-heading text-white">
                                Featured <span className="text-gradient">Platforms</span>
                            </h2>
                        </div>
                        <Link
                            href="/inventory"
                            className="btn-secondary hidden md:inline-block"
                        >
                            View All Assets →
                        </Link>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featured.map((asset, index) => (
                        <MotionWrapper key={asset.id} delay={0.1 * index}>
                            <Link href="/inventory" className="group">
                                <div className="card overflow-hidden">
                                    <div className="relative aspect-video bg-charcoal-900 overflow-hidden">
                                        <img
                                            src={`${asset.frameDir}/${asset.framePrefix}001.jpg`}
                                            alt={asset.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-0.5 text-[8px] font-heading uppercase tracking-wider bg-olive-900/60 text-olive-400 border border-olive-700/30 rounded">
                                                {asset.classification}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-white mb-1 group-hover:text-olive-400 transition-colors">
                                            {asset.name}
                                        </h3>
                                        <p className="text-[11px] text-charcoal-500 leading-relaxed line-clamp-2">
                                            {asset.description}
                                        </p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <div
                                                    className={`w-1.5 h-1.5 rounded-full ${asset.status === 'operational'
                                                            ? 'bg-green-500'
                                                            : asset.status === 'deployed'
                                                                ? 'bg-blue-500'
                                                                : asset.status === 'maintenance'
                                                                    ? 'bg-amber-500'
                                                                    : 'bg-charcoal-500'
                                                        }`}
                                                />
                                                <span className="text-[9px] font-heading uppercase tracking-wider text-charcoal-500">
                                                    {asset.status}
                                                </span>
                                            </div>
                                            <span className="text-[9px] font-heading text-charcoal-600">
                                                {asset.unitCount.toLocaleString()} units
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </MotionWrapper>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/inventory" className="btn-secondary inline-block">
                        View All Assets →
                    </Link>
                </div>
            </div>
        </section>
    );
}
