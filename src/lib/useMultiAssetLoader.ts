'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { assets } from '@/data/assets';

interface FrameSet {
    assetId: string;
    images: HTMLImageElement[];
    loaded: boolean;
}

export function useMultiAssetLoader() {
    const [frameSets, setFrameSets] = useState<Record<string, FrameSet>>({});
    const [overallProgress, setOverallProgress] = useState(0);
    const [currentlyLoading, setCurrentlyLoading] = useState('');
    const [allLoaded, setAllLoaded] = useState(false);
    const loadedCountRef = useRef(0);
    const totalFrames = useRef(assets.reduce((sum, a) => sum + a.frameCount, 0));

    useEffect(() => {
        let cancelled = false;

        const loadAsset = async (asset: typeof assets[0]): Promise<FrameSet> => {
            const images: HTMLImageElement[] = [];
            const promises = Array.from({ length: asset.frameCount }, (_, i) => {
                return new Promise<HTMLImageElement | null>((resolve) => {
                    const img = new Image();
                    const num = String(i + 1).padStart(3, '0');
                    img.src = `${asset.frameDir}/${asset.framePrefix}${num}.jpg`;
                    img.onload = () => {
                        loadedCountRef.current++;
                        if (!cancelled) {
                            setOverallProgress(
                                Math.round((loadedCountRef.current / totalFrames.current) * 100)
                            );
                        }
                        resolve(img);
                    };
                    img.onerror = () => {
                        loadedCountRef.current++;
                        if (!cancelled) {
                            setOverallProgress(
                                Math.round((loadedCountRef.current / totalFrames.current) * 100)
                            );
                        }
                        resolve(null); // null for broken images
                    };
                });
            });

            const results = await Promise.all(promises);
            results.forEach((img, idx) => { if (img) images[idx] = img; });
            return { assetId: asset.id, images, loaded: true };
        };

        const loadAll = async () => {
            for (const asset of assets) {
                if (cancelled) break;
                setCurrentlyLoading(asset.name);
                const frameSet = await loadAsset(asset);
                if (!cancelled) {
                    setFrameSets((prev) => ({ ...prev, [asset.id]: frameSet }));
                }
            }
            if (!cancelled) setAllLoaded(true);
        };

        loadAll();
        return () => { cancelled = true; };
    }, []);

    return { frameSets, overallProgress, currentlyLoading, allLoaded };
}
