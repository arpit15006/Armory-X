'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

const PUBLIC_PATHS = ['/login', '/signup'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isInitialized } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isInitialized) return;

        const isPublic = PUBLIC_PATHS.includes(pathname);

        if (isPublic && isAuthenticated) {
            router.push('/');
        } else if (!isPublic && !isAuthenticated) {
            router.push('/login');
        } else {
            setIsChecking(false);
        }
    }, [isAuthenticated, isInitialized, pathname, router]);

    // Show nothing or loader while checking auth state / redirecting
    // We only show loader if initialized but still determining route access
    // Or if not initialized yet
    if (!isInitialized || isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-charcoal-950">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-olive-600 rotate-45 mx-auto mb-4 animate-pulse">
                        <div className="w-full h-full flex items-center justify-center -rotate-45">
                            <svg className="w-6 h-6 text-olive-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-xs font-heading uppercase tracking-[0.2em] text-charcoal-500">
                        {isInitialized ? 'Verifying clearance...' : 'Initializing system...'}
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
