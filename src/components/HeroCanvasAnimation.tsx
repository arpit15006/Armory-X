'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useMotion } from '@/lib/MotionContext';
import { useFrameLoader } from '@/lib/useFrameLoader';
import { assets } from '@/data/assets';

// Scroll height per asset — how far you scroll to play all its frames
const VH_PER_ASSET = 6;
const TOTAL_HEIGHT_VH = VH_PER_ASSET * assets.length;

// Detailed paragraphs for each scroll phase of an asset
const phaseContent: Record<string, { title: string; body: string }[]> = {
    m4: [
        { title: 'Platform Overview', body: 'The M4 Carbine is the standard-issue modular weapon platform designed for adaptability across diverse operational environments. Its lightweight frame and compact profile make it ideal for rapid deployment and close-quarters operations.' },
        { title: 'Engineering Detail', body: 'Precision-machined upper and lower receivers ensure sub-MOA accuracy at standard engagement distances. The free-floating barrel system minimizes harmonic interference during sustained fire operations.' },
        { title: 'Modular Configuration', body: 'Quad-rail handguard system supports mission-specific attachments including optics, illumination, and forward grip modules. The telescoping stock accommodates operators of all frame sizes.' },
        { title: 'Operational Status', body: 'Currently deployed across multiple theater commands with a 98.7% operational readiness rate. Scheduled for next-generation optics integration in the upcoming modernization cycle.' },
    ],
    ak: [
        { title: 'Platform Overview', body: 'The AKM represents one of the most widely fielded assault platforms in global inventory. Its legendary reliability in extreme environments makes it a benchmark for infantry weapon systems worldwide.' },
        { title: 'Engineering Detail', body: 'Gas-operated rotating bolt mechanism with deliberate manufacturing tolerances ensures functionality in sand, mud, and arctic conditions. Chrome-lined barrel extends service life under sustained use.' },
        { title: 'Field Performance', body: 'Effective engagement range of 400 meters with 7.62×39mm intermediate cartridge. The long-stroke gas piston provides consistent cycling even with minimal maintenance intervals.' },
        { title: 'Logistics Profile', body: 'Simplified field-stripping procedure enables depot-level maintenance by forward-deployed personnel. Interchangeable components across variants reduce supply chain complexity across allied forces.' },
    ],
    awm: [
        { title: 'Platform Overview', body: 'The AWM is a precision long-range engagement platform engineered for extreme-distance target interdiction. Built around the .338 Lapua Magnum cartridge, it delivers consistent sub-MOA accuracy beyond 1,500 meters.' },
        { title: 'Precision Engineering', body: 'Cold hammer-forged barrel with 1:10 twist rate ensures optimal projectile stabilization. The adjustable trigger mechanism provides a crisp, glass-rod break at user-configurable pull weights.' },
        { title: 'Optics Integration', body: 'Integrated MIL-STD-1913 rail system accommodates variable-power optics from 4× to 25× magnification. The free-floating barrel design eliminates point-of-impact shift from accessory mounting pressure.' },
        { title: 'Deployment Record', body: 'Verified effective engagement records exceeding 2,400 meters in theater operations. Adopted by 14 NATO member nations as the primary precision engagement system.' },
    ],
    glock: [
        { title: 'Platform Overview', body: 'The Glock sidearm platform represents the global standard in polymer-frame duty handguns. Its striker-fired mechanism and minimal part count deliver unmatched reliability for personal defense operations.' },
        { title: 'Design Philosophy', body: 'Polymer frame construction reduces weight by 48% versus traditional all-metal designs while maintaining structural rigidity. The Safe Action trigger system provides three independent safety mechanisms without external controls.' },
        { title: 'Interoperability', body: 'Standardized magazine system ensures cross-compatibility across the entire platform family. Accessory rail supports illumination and laser designator modules for low-light operational requirements.' },
        { title: 'Service Record', body: 'In continuous service across 49 national defense and law enforcement agencies. Mean rounds between failure exceeds 20,000 cycles in independent evaluation testing.' },
    ],
    knife: [
        { title: 'Platform Overview', body: 'The tactical combat knife serves as the essential close-quarters utility tool in every operator\'s loadout. Designed for both utility tasks and defensive applications in field environments.' },
        { title: 'Material Science', body: 'Full-tang construction from CPM-S30V stainless steel provides exceptional edge retention and corrosion resistance. The 58-60 HRC hardness rating balances durability with field-sharpening capability.' },
        { title: 'Ergonomic Design', body: 'G10 composite handle scales with aggressive jimping provide positive grip in wet and gloved conditions. The pommel serves as an emergency glass-breaker and signaling device.' },
        { title: 'Multi-Role Capability', body: 'Combination edge profile with tanto point geometry enables piercing, slicing, and prying operations. Issued with MOLLE-compatible sheath for multiple carry position configurations.' },
    ],
    apc: [
        { title: 'Platform Overview', body: 'The Armored Personnel Carrier provides protected tactical mobility for mechanized infantry operations. Its V-hull design and composite armor package deliver multi-threat protection for mounted personnel.' },
        { title: 'Protection Systems', body: 'Modular appliqué armor system provides scalable protection from small arms, artillery fragments, and IED blast effects. The V-hull geometry deflects under-body blast energy away from the crew compartment.' },
        { title: 'Mobility Platform', body: '6×6 independent suspension with central tire inflation system enables cross-country mobility at speeds exceeding 100 km/h on improved surfaces. The amphibious capability allows water obstacle crossing.' },
        { title: 'Command Integration', body: 'Integrated C4ISR suite provides real-time tactical data exchange with higher headquarters. Supports squad-level dismount operations with rear ramp deployment for 8 fully-equipped personnel.' },
    ],
    tank: [
        { title: 'Platform Overview', body: 'The Main Battle Tank represents the apex of armored warfare capability. Combining advanced composite armor, stabilized weapon systems, and all-terrain mobility into a unified combat platform.' },
        { title: 'Firepower Systems', body: '120mm smoothbore main gun with autoloader delivers 6-8 rounds per minute of multi-purpose ammunition. The fire control system integrates laser rangefinding, thermal imaging, and ballistic computation.' },
        { title: 'Armor Technology', body: 'Chobham-type composite armor with reactive ERA panels provides multi-spectral threat defeat capability. NBC protection system maintains crew survivability in contaminated environments.' },
        { title: 'Tactical Mobility', body: 'Gas turbine powerplant generates 1,500 hp enabling 65 km/h road speed at 60+ tonnes combat weight. The advanced suspension absorbs terrain irregularities for stable firing on the move.' },
    ],
};

export default function HeroCanvasAnimation() {
    const { reducedMotion } = useMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [localProgress, setLocalProgress] = useState(0);
    const activeAsset = assets[currentIndex];
    const lastDrawnRef = useRef<string>('');

    // Load frames for the current asset
    const { frames, isLoaded } = useFrameLoader(
        activeAsset.frameDir,
        activeAsset.frameCount,
        activeAsset.framePrefix
    );

    // Helper: Preload next asset's frames to warm browser cache
    useEffect(() => {
        if (currentIndex < assets.length - 1) {
            const nextAsset = assets[currentIndex + 1];
            // Async preload without blocking
            const preload = async () => {
                for (let i = 1; i <= Math.min(nextAsset.frameCount, 20); i++) { // Load first 20 frames priority
                    const img = new Image();
                    const num = String(i).padStart(3, '0');
                    img.src = `${nextAsset.frameDir}/${nextAsset.framePrefix}${num}.jpg`;
                }
            };
            preload();
        }
    }, [currentIndex]);


    // Framer Motion scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.0005,
    });

    // Detect current asset based on scroll
    useEffect(() => {
        const unsubscribe = smoothProgress.on('change', (latest) => {
            // Calculate which asset segment we are in
            // refinedProgress maps 0..1 to 0..assets.length
            const rawIndex = latest * assets.length;
            const index = Math.min(Math.floor(rawIndex), assets.length - 1);

            // Calculate local progress (0..1) within that asset's segment
            const segmentSize = 1 / assets.length;
            const segmentStart = index * segmentSize;
            const localRaw = (latest - segmentStart) / segmentSize;
            const local = Math.max(0, Math.min(1, localRaw));

            if (index !== currentIndex) {
                setCurrentIndex(index);
                lastDrawnRef.current = ''; // Reset drawing cache on switch
            }
            setLocalProgress(local);
        });
        return () => unsubscribe();
    }, [smoothProgress, currentIndex]);


    // Resize canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Draw frame
    const drawFrame = useCallback(
        (frameIndex: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // If we switched assets, frames array might be empty or loading
            // If frames are for previous asset, don't draw
            if (!frames || frames.length === 0) return;

            const img = frames[frameIndex];
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const key = `${activeAsset.id}_${frameIndex}`;
            if (lastDrawnRef.current === key) return;
            lastDrawnRef.current = key;

            const dpr = window.devicePixelRatio || 1;
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Fill background
            ctx.fillStyle = '#0f1012';
            ctx.fillRect(0, 0, w, h);

            // Crop Logic (same as before)
            const cropH = img.naturalHeight * 0.92;
            const imgRatio = img.naturalWidth / cropH;
            const canvasRatio = w / h;
            let sw: number, sh: number, sx: number, sy: number;

            if (canvasRatio > imgRatio) {
                sw = img.naturalWidth;
                sh = img.naturalWidth / canvasRatio;
                sx = 0;
                sy = Math.max(0, (cropH - sh) / 2);
            } else {
                sh = cropH;
                sw = cropH * canvasRatio;
                sx = Math.max(0, (img.naturalWidth - sw) / 2);
                sy = 0;
            }

            try {
                ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
            } catch { }
        },
        [frames, activeAsset.id]
    );

    // Drive animation with local progress
    useEffect(() => {
        if (!isLoaded || reducedMotion) return;

        // Use localProgress state which we update in the scroll listener
        const frameIndex = Math.min(
            Math.floor(localProgress * activeAsset.frameCount),
            activeAsset.frameCount - 1
        );
        drawFrame(Math.max(0, frameIndex));
    }, [localProgress, isLoaded, reducedMotion, drawFrame, activeAsset.frameCount]);

    // Initial draw
    useEffect(() => {
        if (isLoaded && frames.length > 0) {
            drawFrame(0);
        }
    }, [isLoaded, frames, drawFrame]);

    // Manual Jump (Click Tab)
    const scrollToAsset = (index: number) => {
        if (!containerRef.current) return;
        // Calculate scroll position relative to document
        // This is tricky because we are inside a container. 
        // We'd need to scroll the window to the start of this segment.
        // For now, simpler to just let user scroll. 
        // But we can try to scroll window.
    };

    const phases = phaseContent[activeAsset.id] || [];

    // Map global progress to local progress for phase overlays
    // Actually, PhaseOverlay takes `smoothProgress`.
    // In new logic, `smoothProgress` is 0..1 global.
    // PhaseOverlay expects 0..1 local.
    // So we need to adapt PhaseOverlay or pass a transformed spring?
    // We can just pass `localProgress` but it's not a MotionValue.
    // FrameOverlay uses useTransform which needs MotionValue.

    // Create a local MotionValue for the current asset?
    const localMotionValue = useTransform(smoothProgress, [currentIndex / assets.length, (currentIndex + 1) / assets.length], [0, 1]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: `${TOTAL_HEIGHT_VH * 100}vh` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0f1012]">
                <AnimatePresence>
                    {!isLoaded && (
                        <motion.div
                            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0f1012]"
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="w-16 h-16 border-2 border-olive-600 rotate-45 flex items-center justify-center mb-8 animate-spin-slow">
                                <span className="text-olive-400 font-heading font-bold text-lg -rotate-45">AX</span>
                            </div>
                            <p className="text-[10px] font-heading uppercase tracking-[0.3em] text-charcoal-500 animate-pulse">
                                Initializing {activeAsset.name}...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ display: isLoaded ? 'block' : 'none' }}
                />

                {isLoaded && (
                    <>
                        <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#0f1012] via-[#0f1012]/85 to-transparent pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f1012] to-transparent pointer-events-none z-10" />

                        {/* Tabs - Now act as indicators */}
                        <div className="absolute top-20 left-0 right-0 z-30 px-6 md:px-12">
                            <div className="flex flex-wrap items-center gap-0">
                                {assets.map((asset, i) => (
                                    <div
                                        key={asset.id}
                                        className={`px-4 py-2.5 text-[10px] md:text-[11px] font-heading uppercase tracking-[0.12em] transition-all duration-300 border-b-2 ${currentIndex === i
                                            ? 'text-olive-400 border-olive-500 bg-olive-950/30'
                                            : 'text-charcoal-600 border-transparent'
                                            }`}
                                    >
                                        {asset.id === 'knife' ? 'KNIFE' : asset.id === 'glock' ? 'GLOCK' : asset.name.length > 10 ? asset.id.toUpperCase() : asset.name}
                                    </div>
                                ))}
                            </div>
                            <div className="h-px bg-charcoal-800/40" />
                        </div>

                        {!reducedMotion && phases.map((phase, i) => (
                            <PhaseOverlay
                                key={`${activeAsset.id}-${i}`}
                                phase={phase}
                                index={i}
                                total={phases.length}
                                asset={activeAsset}
                                smoothProgress={localMotionValue} // Pass local motion value
                                isFirst={i === 0}
                            />
                        ))}

                        {!reducedMotion && (
                            <ScrollIndicator smoothProgress={smoothProgress} /> // Shows global progress? Or per asset?
                        )}

                        {/* Global Progress Bar */}
                        {!reducedMotion && (
                            <ProgressBar smoothProgress={smoothProgress} />
                        )}
                    </>
                )}

                {reducedMotion && isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <img
                            src={`${activeAsset.frameDir}/${activeAsset.framePrefix}001.jpg`}
                            alt={activeAsset.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Phase Text Overlay ────────────────────────────────────────────
function PhaseOverlay({
    phase,
    index,
    total,
    asset,
    smoothProgress,
    isFirst,
}: {
    phase: { title: string; body: string };
    index: number;
    total: number;
    asset: typeof assets[0];
    smoothProgress: any;
    isFirst: boolean;
}) {
    // Each phase occupies a slice of 0-1 (local asset progress)
    const segStart = index / total;
    const segEnd = (index + 1) / total;
    const fadeInEnd = segStart + (segEnd - segStart) * 0.15;
    const fadeOutStart = segEnd - (segEnd - segStart) * 0.15;

    const opacity = useTransform(
        smoothProgress,
        [segStart, fadeInEnd, fadeOutStart, segEnd],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        smoothProgress,
        [segStart, fadeInEnd, fadeOutStart, segEnd],
        [30, 0, 0, -30]
    );

    const statusColor =
        asset.status === 'operational' ? 'bg-green-500' :
            asset.status === 'deployed' ? 'bg-blue-500' :
                asset.status === 'maintenance' ? 'bg-amber-500' : 'bg-charcoal-500';

    return (
        <motion.div
            className="absolute inset-0 z-20 flex items-center pointer-events-none"
            style={{ opacity }}
        >
            <motion.div
                className="pl-6 md:pl-12 lg:pl-16 max-w-lg"
                style={{ y }}
            >
                {/* Classification badge — only on first phase */}
                {isFirst && (
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse-slow ${statusColor}`} />
                        <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-olive-500">
                            {asset.classification}
                        </span>
                    </div>
                )}

                {/* Asset name — only on first phase */}
                {isFirst && (
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-wider text-white mb-5 leading-[0.95]">
                        {asset.name}
                    </h2>
                )}

                {/* Phase title */}
                {!isFirst && (
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-px bg-olive-600" />
                        <span className="text-[10px] font-heading uppercase tracking-[0.25em] text-olive-500">
                            {asset.name}
                        </span>
                    </div>
                )}

                <h3 className="text-lg md:text-xl font-heading font-semibold uppercase tracking-wider text-olive-400 mb-3">
                    {phase.title}
                </h3>

                <p className="text-xs md:text-sm text-charcoal-300 leading-relaxed mb-5">
                    {phase.body}
                </p>

                {isFirst && (
                    <div className="space-y-1.5 mb-4">
                        {asset.specs.slice(0, 4).map((spec) => (
                            <div key={spec.label} className="flex items-center gap-3">
                                <span className="text-[9px] font-heading uppercase tracking-wider text-charcoal-600 w-20 md:w-24">
                                    {spec.label}
                                </span>
                                <span className="text-[10px] md:text-[11px] text-charcoal-400 font-mono">
                                    {spec.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {isFirst && (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-charcoal-900/60 border border-charcoal-800/40 rounded backdrop-blur-sm">
                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse-slow ${statusColor}`} />
                            <span className="text-[9px] font-heading uppercase tracking-wider text-charcoal-400">
                                {asset.status}
                            </span>
                        </div>
                        <span className="text-[9px] font-heading text-charcoal-600">
                            {asset.unitCount.toLocaleString()} units
                        </span>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

// ─── Scroll Indicator ──────────────────────────────────────────────
function ScrollIndicator({ smoothProgress }: { smoothProgress: any }) {
    // Keep visible longer (up to 15% of scroll) - Global progress 0.15 is basically first asset end
    const opacity = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]);

    return (
        <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
            style={{ opacity }}
        >
            <span className="text-[9px] md:text-[10px] font-heading uppercase tracking-[0.2em] text-olive-500 font-bold animate-pulse text-center">
                Continue Scroll<br />to Analyze
            </span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-5 h-8 border border-olive-500/50 rounded-full flex items-start justify-center pt-1.5 backdrop-blur-[2px]"
            >
                <div className="w-0.5 h-2 bg-olive-500 rounded-full" />
            </motion.div>
        </motion.div>
    );
}

// ─── Progress Bar ──────────────────────────────────────────────────
function ProgressBar({ smoothProgress }: { smoothProgress: any }) {
    const width = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
    return (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-charcoal-900 z-30">
            <motion.div
                className="h-full bg-gradient-to-r from-olive-700 to-olive-400"
                style={{ width }}
            />
        </div>
    );
}

