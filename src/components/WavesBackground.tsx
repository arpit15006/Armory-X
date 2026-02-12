'use client';

import Waves from '@/components/Waves';

export default function WavesBackground() {
    return (
        <div className="fixed inset-0 z-0">
            <Waves
                lineColor="#537a38"
                backgroundColor="transparent"
                waveSpeedX={0.0125}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
                className="opacity-[0.25]"
            />
        </div>
    );
}


