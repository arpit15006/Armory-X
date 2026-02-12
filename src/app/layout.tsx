import type { Metadata } from 'next';
import { Inter, Rajdhani } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { MotionProvider } from '@/lib/MotionContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WavesBackground from '@/components/WavesBackground';
import AuthGuard from '@/components/AuthGuard';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const rajdhani = Rajdhani({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-rajdhani',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'ARMORY-X | Defense Logistics & Armory Management',
    description:
        'A frontend prototype of a defense logistics and armory management system. Engineering transparency and inventory visualization for authorized national representatives.',
    keywords: ['defense', 'logistics', 'armory', 'management', 'inventory'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
            <body className="min-h-screen bg-charcoal-950 text-charcoal-100 font-body antialiased scrollbar-thin">
                <AuthProvider>
                    <AuthGuard>
                        <MotionProvider>
                            {/* Global Waves background — fixed behind all pages */}
                            <WavesBackground />
                            <Navbar />
                            <main className="relative z-[1] min-h-screen">{children}</main>
                            <Footer />
                        </MotionProvider>
                    </AuthGuard>
                </AuthProvider>
            </body>
        </html>
    );
}
