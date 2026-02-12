'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets, getAssetsByCategory } from '@/data/assets';
import { Asset } from '@/types';
import MotionWrapper from '@/components/MotionWrapper';

const categories = [
    { id: 'all', label: 'All Assets' },
    { id: 'firearms', label: 'Firearms' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'equipment', label: 'Equipment' },
];

export default function InventoryPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [allocationRequested, setAllocationRequested] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredAssets = getAssetsByCategory(activeCategory);

    const handleRequestAllocation = (assetId: string) => {
        setAllocationRequested((prev) => [...prev, assetId]);
        setTimeout(() => {
            setAllocationRequested((prev) => prev.filter((id) => id !== assetId));
        }, 3000);
    };

    return (
        <div className="min-h-screen pt-28 pb-16 relative">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-charcoal-950" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(85,100,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(85,100,50,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-transparent to-charcoal-950/80" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <MotionWrapper>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-charcoal-800/60 pb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-0.5 bg-olive-600" />
                                <span className="text-[10px] font-heading uppercase tracking-[0.4em] text-olive-500">
                                    Restricted Access // Level 3
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
                                Asset <span className="text-olive-500">Registry</span>
                            </h1>
                        </div>

                    </div>
                </MotionWrapper>

                {/* Filters */}
                <MotionWrapper delay={0.1}>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => { setActiveCategory(cat.id); setSelectedAsset(null); }}
                                className={`relative px-6 py-2 text-[10px] font-heading uppercase tracking-[0.2em] transition-all duration-300 group overflow-hidden border ${activeCategory === cat.id
                                    ? 'border-olive-500 bg-olive-900/20 text-olive-400'
                                    : 'border-charcoal-700 bg-charcoal-900/40 text-charcoal-500 hover:border-charcoal-500 hover:text-charcoal-300'
                                    }`}
                            >
                                <span className="relative z-10">{cat.label}</span>
                                {activeCategory === cat.id && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-olive-500/10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <div className={`absolute bottom-0 left-0 h-[2px] bg-olive-500 transition-all duration-300 ${activeCategory === cat.id ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`} />
                            </button>
                        ))}
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Asset Grid */}
                    <div className={`${selectedAsset ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                        <div className={`grid gap-6 ${selectedAsset || viewMode === 'list'
                            ? 'grid-cols-1 md:grid-cols-2'
                            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            }`}>
                            <AnimatePresence mode='popLayout'>
                                {filteredAssets.map((asset, index) => (
                                    <MotionWrapper key={asset.id} delay={0.05 * index}>
                                        <div
                                            className={`group relative bg-charcoal-900/40 backdrop-blur-sm border transition-all duration-300 cursor-pointer overflow-hidden ${selectedAsset?.id === asset.id
                                                ? 'border-olive-500 shadow-[0_0_20px_rgba(85,100,50,0.15)]'
                                                : 'border-charcoal-800 hover:border-olive-500/50 hover:bg-charcoal-800/60'
                                                }`}
                                            onClick={() => setSelectedAsset(selectedAsset?.id === asset.id ? null : asset)}
                                        >
                                            {/* Decorative Corners */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-olive-500/50 transition-colors" />
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-olive-500/50 transition-colors" />
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-olive-500/50 transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-olive-500/50 transition-colors" />

                                            <div className="relative aspect-video overflow-hidden border-b border-charcoal-800 bg-charcoal-950">
                                                <img
                                                    src={`${asset.frameDir}/${asset.framePrefix}001.jpg`}
                                                    alt={asset.name}
                                                    className="w-full h-full object-cover object-[center_40%] scale-[1.12] group-hover:scale-125 transition-transform duration-700 saturate-[0.8] group-hover:saturate-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-900/40 opacity-90" />

                                                {/* Targeting Overlay */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-olive-500/30 rounded-full flex items-center justify-center">
                                                        <div className="w-1 h-1 bg-olive-500 rounded-full" />
                                                    </div>
                                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-olive-500/10" />
                                                    <div className="absolute top-0 left-1/2 h-full w-[1px] bg-olive-500/10" />
                                                </div>

                                                <div className="absolute top-3 left-3">
                                                    <span className="px-2 py-1 text-[8px] font-heading uppercase tracking-wider bg-black/60 text-olive-400 border border-olive-500/30 backdrop-blur-sm">
                                                        {asset.classification}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-white group-hover:text-olive-400 transition-colors">
                                                        {asset.name}
                                                    </h3>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${asset.status === 'operational' ? 'bg-green-500 animate-pulse-slow' : 'bg-amber-500'}`} />
                                                </div>
                                                <p className="text-[10px] text-charcoal-400 font-mono line-clamp-2 mb-4 h-8">
                                                    {asset.description}
                                                </p>

                                                <div className="flex items-center justify-between pt-3 border-t border-charcoal-800/50">
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] text-charcoal-600 font-heading uppercase tracking-wider">Stock</span>
                                                        <span className="text-xs text-charcoal-300 font-mono">{asset.unitCount.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-[8px] text-charcoal-600 font-heading uppercase tracking-wider">ID</span>
                                                        <span className="text-xs text-charcoal-500 font-mono">ASSET-{index.toString().padStart(3, '0')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </MotionWrapper>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Detail Panel */}
                    <AnimatePresence mode="wait">
                        {selectedAsset && (
                            <motion.div
                                key={selectedAsset.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="lg:col-span-1"
                            >
                                <div className="sticky top-28 bg-charcoal-900/80 backdrop-blur-md border border-olive-500/20 p-4 relative overflow-hidden">
                                    {/* Tech Grid Background */}
                                    <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-olive-600 to-transparent" />

                                    <div className="flex items-center justify-between mb-6 relative z-10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-olive-500 animate-pulse" />
                                            <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500">
                                                Spec Sheet
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedAsset(null)}
                                            className="text-charcoal-500 hover:text-white transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mb-4 relative group cursor-crosshair">
                                        <div className="aspect-video bg-black border border-charcoal-800 overflow-hidden relative">
                                            <img
                                                src={`${selectedAsset.frameDir}/${selectedAsset.framePrefix}001.jpg`}
                                                alt={selectedAsset.name}
                                                className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity scale-110"
                                            />
                                            {/* Scan lines */}
                                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 bg-olive-600 px-2 py-0.5 text-[9px] font-heading font-bold text-black uppercase">
                                            FIG 1.0
                                        </div>
                                    </div>

                                    <h2 className="text-lg font-heading font-bold uppercase tracking-wide text-white mb-1.5">
                                        {selectedAsset.name}
                                    </h2>
                                    <p className="text-xs text-charcoal-400 font-mono leading-relaxed mb-4 border-l-2 border-charcoal-800 pl-3">
                                        {selectedAsset.description}
                                    </p>

                                    <div className="space-y-3 mb-4">
                                        <h3 className="text-[10px] font-heading uppercase tracking-[0.2em] text-charcoal-500 border-b border-charcoal-800 pb-1.5">
                                            Technical Data
                                        </h3>
                                        <div className="grid gap-px bg-charcoal-800 border border-charcoal-800">
                                            {selectedAsset.specs.map((spec) => (
                                                <div key={spec.label} className="grid grid-cols-2 bg-charcoal-900/50 p-2">
                                                    <span className="text-[10px] uppercase tracking-wider text-charcoal-500">
                                                        {spec.label}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-olive-100 text-right">
                                                        {spec.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-4 p-2.5 bg-charcoal-950/50 border border-charcoal-800 rounded">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase tracking-wider text-charcoal-500">Operational Status</span>
                                            <span className={`text-xs font-heading uppercase tracking-wider ${selectedAsset.status === 'operational' ? 'text-green-500' : 'text-amber-500'
                                                }`}>
                                                {selectedAsset.status}
                                            </span>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${selectedAsset.status === 'operational' ? 'bg-green-500 animate-pulse-slow' : 'bg-amber-500'
                                            }`} />
                                    </div>

                                    <button
                                        onClick={() => handleRequestAllocation(selectedAsset.id)}
                                        disabled={allocationRequested.includes(selectedAsset.id)}
                                        className={`w-full py-2.5 text-[10px] font-heading uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group border ${allocationRequested.includes(selectedAsset.id)
                                            ? 'bg-olive-900/20 border-olive-500/50 text-olive-400 cursor-default'
                                            : 'bg-olive-600 border-transparent text-white hover:bg-olive-500'
                                            }`}
                                    >
                                        <span className="relative z-10">
                                            {allocationRequested.includes(selectedAsset.id)
                                                ? 'Requisition Sent'
                                                : 'Initiate Requisition'
                                            }
                                        </span>
                                        {!allocationRequested.includes(selectedAsset.id) && (
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
