'use client';

import { useState, useEffect, useRef } from 'react';

interface UseFrameLoaderResult {
    frames: HTMLImageElement[];
    progress: number;
    isLoaded: boolean;
    error: string | null;
}

export function useFrameLoader(
    frameDir: string,
    frameCount: number,
    framePrefix: string = 'ezgif-frame-'
): UseFrameLoaderResult {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const prevDirRef = useRef<string>('');

    useEffect(() => {
        if (prevDirRef.current === frameDir && framesRef.current.length === frameCount) {
            return;
        }
        prevDirRef.current = frameDir;

        let cancelled = false;
        framesRef.current = [];
        setProgress(0);
        setIsLoaded(false);
        setError(null);

        const loadFrames = async () => {
            const images: HTMLImageElement[] = [];
            let loaded = 0;

            const promises = Array.from({ length: frameCount }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    const num = String(i + 1).padStart(3, '0');
                    img.src = `${frameDir}/${framePrefix}${num}.jpg`;
                    img.onload = () => {
                        loaded++;
                        if (!cancelled) {
                            setProgress(Math.round((loaded / frameCount) * 100));
                        }
                        resolve(img);
                    };
                    img.onerror = () => {
                        loaded++;
                        if (!cancelled) {
                            setProgress(Math.round((loaded / frameCount) * 100));
                        }
                        reject(new Error(`Failed to load frame ${num}`));
                    };
                });
            });

            try {
                const results = await Promise.allSettled(promises);
                if (cancelled) return;

                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        images[index] = result.value;
                    }
                });

                framesRef.current = images;
                setIsLoaded(true);
            } catch (err) {
                if (!cancelled) {
                    setError('Failed to load animation frames');
                }
            }
        };

        loadFrames();

        return () => {
            cancelled = true;
        };
    }, [frameDir, frameCount, framePrefix]);

    return { frames: framesRef.current, progress, isLoaded, error };
}
