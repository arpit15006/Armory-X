'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/lib/AuthContext';
import { getCountryByCode } from '@/data/countries';
import { UserProfile } from '@/types';

const defaultProfile: UserProfile = {
    country: '',
    officerName: '',
    role: 'Logistics Officer',
    bio: 'Authorized personnel with access to defense logistics and inventory management systems.',
    profileImage: '',
    theme: 'default',
    socialLinks: {
        linkedin: '',
        instagram: '',
        facebook: '',
        x: '',
        email: '',
    },
};

const themes = [
    { id: 'default', label: 'Standard', color: 'bg-olive-600', text: 'text-olive-500' },
    { id: 'desert', label: 'Desert', color: 'bg-amber-600', text: 'text-amber-500' },
    { id: 'arctic', label: 'Arctic', color: 'bg-blue-600', text: 'text-blue-500' },
    { id: 'naval', label: 'Naval', color: 'bg-teal-600', text: 'text-teal-500' },
] as const;

const themeColors = {
    default: {
        primary: 'text-olive-500',
        primaryHover: 'hover:text-olive-400',
        border: 'border-olive-600',
        borderDim: 'border-olive-900/30',
        bg: 'bg-olive-600',
        bgDim: 'bg-olive-900/10',
        ring: 'focus:ring-olive-600/50',
        inputFocus: 'focus:border-olive-500',
        button: 'bg-olive-600 hover:bg-olive-500',
        selection: 'selection:bg-olive-900 selection:text-olive-200',
        icon: 'text-olive-500',
    },
    desert: {
        primary: 'text-amber-500',
        primaryHover: 'hover:text-amber-400',
        border: 'border-amber-600',
        borderDim: 'border-amber-900/30',
        bg: 'bg-amber-600',
        bgDim: 'bg-amber-900/10',
        ring: 'focus:ring-amber-600/50',
        inputFocus: 'focus:border-amber-500',
        button: 'bg-amber-600 hover:bg-amber-500',
        selection: 'selection:bg-amber-900 selection:text-amber-200',
        icon: 'text-amber-500',
    },
    arctic: {
        primary: 'text-blue-500',
        primaryHover: 'hover:text-blue-400',
        border: 'border-blue-600',
        borderDim: 'border-blue-900/30',
        bg: 'bg-blue-600',
        bgDim: 'bg-blue-900/10',
        ring: 'focus:ring-blue-600/50',
        inputFocus: 'focus:border-blue-500',
        button: 'bg-blue-600 hover:bg-blue-500',
        selection: 'selection:bg-blue-900 selection:text-blue-200',
        icon: 'text-blue-500',
    },
    naval: {
        primary: 'text-teal-500',
        primaryHover: 'hover:text-teal-400',
        border: 'border-teal-600',
        borderDim: 'border-teal-900/30',
        bg: 'bg-teal-600',
        bgDim: 'bg-teal-900/10',
        ring: 'focus:ring-teal-600/50',
        inputFocus: 'focus:border-teal-500',
        button: 'bg-teal-600 hover:bg-teal-500',
        selection: 'selection:bg-teal-900 selection:text-teal-200',
        icon: 'text-teal-500',
    },
};

export default function ProfilePage() {
    return (
        <AuthGuard>
            <ProfileContent />
        </AuthGuard>
    );
}

function ProfileContent() {
    const { auth, logout } = useAuth();
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [editWarning, setEditWarning] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Get current theme colors
    const colors = themeColors[profile.theme] || themeColors.default;

    useEffect(() => {
        const stored = localStorage.getItem('armory-x-profile');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setProfile({ ...defaultProfile, ...parsed, socialLinks: { ...defaultProfile.socialLinks, ...parsed.socialLinks } });
            } catch { }
        } else {
            const country = getCountryByCode(auth.country);
            setProfile({
                ...defaultProfile,
                country: country?.name || auth.country,
                officerName: `Officer ${country?.code || 'X'}`,
            });
        }
    }, [auth.country]);

    const handleSave = () => {
        localStorage.setItem('armory-x-profile', JSON.stringify(profile));
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const updateField = (field: keyof UserProfile, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const updateSocial = (field: string, value: string) => {
        setProfile((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [field]: value },
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            updateField('profileImage', reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleInputClick = () => {
        if (!editing) {
            setEditWarning(true);
            setTimeout(() => setEditWarning(false), 2000);
        }
    };

    return (
        <div className={`min-h-screen pt-28 pb-20 ${colors.selection}`}>
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[#0a0b0d]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,20,24,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,20,24,0)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] border-charcoal-800" />
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-charcoal-900/80 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-charcoal-800/60 pb-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-12 h-0.5 ${colors.bg}`} />
                            <span className={`text-[10px] font-heading uppercase tracking-[0.4em] ${colors.primary}`}>
                                Restricted Access // Level 4
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight leading-none">
                            Command <span className={`${colors.primary} animate-pulse-slow`}>Dossier</span>
                        </h1>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-charcoal-900/80 border border-charcoal-700/50 rounded backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-heading uppercase tracking-wider text-charcoal-400">
                                Secure Connection Est.
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-charcoal-600">
                            ID: {auth.accessCode || 'UNKNOWN'}
                        </span>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Identity Module */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        {/* Photo Card */}
                        <div className="relative group">
                            {/* Decorative Corners */}
                            <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 ${colors.border}`} />
                            <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 ${colors.border}`} />
                            <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 ${colors.border}`} />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 ${colors.border}`} />

                            <div className="bg-[#121418] border border-charcoal-800 p-8 flex flex-col items-center text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-grid-white/[0.02]" />

                                {/* Avatar */}
                                <div className="relative w-40 h-40 mb-6 group-hover:scale-105 transition-transform duration-500">
                                    <div className={`absolute inset-0 rounded-full border border-dashed ${colors.border} animate-spin-slow opacity-30`} />
                                    <div className={`absolute inset-2 rounded-full border ${colors.border} opacity-50`} />

                                    <div className="absolute inset-4 rounded-full overflow-hidden bg-charcoal-900 border border-charcoal-700">
                                        {profile.profileImage ? (
                                            <img
                                                src={profile.profileImage}
                                                alt="Officer"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-charcoal-800">
                                                <span className={`text-4xl font-heading font-bold ${colors.primary}`}>
                                                    {profile.officerName.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {editing && (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`absolute bottom-4 right-4 w-8 h-8 ${colors.button} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-20`}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>

                                <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-wider mb-2">
                                    {profile.officerName || 'Unknown'}
                                </h2>
                                <p className={`text-xs font-heading uppercase tracking-[0.2em] ${colors.primary} mb-6`}>
                                    {profile.role}
                                </p>

                                <div className="w-full space-y-3 border-t border-charcoal-800 pt-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-wider text-charcoal-500">Service Status</span>
                                        <span className="text-xs font-mono text-green-500">ACTIVE</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-wider text-charcoal-500">Deployment</span>
                                        <span className="text-xs font-mono text-charcoal-300">{profile.country}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={logout}
                                className={`group relative px-4 py-3 bg-[#121418] border border-charcoal-800 hover:border-red-900/50 transition-colors`}
                            >
                                <span className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-colors" />
                                <div className="relative flex flex-col items-center gap-2">
                                    <svg className="w-5 h-5 text-charcoal-500 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="text-[9px] font-heading uppercase tracking-wider text-charcoal-400 group-hover:text-red-400">Logout</span>
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column: Data Module */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-8"
                    >
                        {/* Top Bar: Edit/Save & Warnings */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-charcoal-800" />
                                <h3 className="text-xl font-heading uppercase tracking-wide text-white">
                                    Personnel Data
                                </h3>
                            </div>
                            <button
                                onClick={() => editing ? handleSave() : setEditing(true)}
                                className={`px-6 py-2 text-[10px] font-heading uppercase tracking-widest transition-all duration-300 border ${editing
                                    ? `${colors.bg} text-white border-transparent shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]`
                                    : `bg-transparent text-charcoal-400 border-charcoal-700 hover:border-white hover:text-white`
                                    }`}
                            >
                                {editing ? 'Save Modifications' : 'Decrypt & Edit'}
                            </button>
                        </div>

                        <AnimatePresence>
                            {/* Alerts */}
                            {editWarning && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 overflow-hidden"
                                >
                                    <div className="bg-amber-900/10 border-l-2 border-amber-500 p-4 flex items-center gap-3">
                                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p className="text-xs font-mono text-amber-500 uppercase">
                                            Write Access Denied. Initialize Edit Mode to modify personnel records.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                            {saved && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 overflow-hidden"
                                >
                                    <div className={`bg-${profile.theme === 'default' ? 'olive' : profile.theme}-900/10 border-l-2 ${colors.border} p-4 flex items-center gap-3`}>
                                        <svg className={`w-5 h-5 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <p className={`text-xs font-mono ${colors.primary} uppercase`}>
                                            Changes encrypted and saved to secure storage.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>


                        {/* Form Container */}
                        <div className="bg-[#121418] border border-charcoal-800 p-8 relative">
                            {/* Decorative Grid */}
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <div className="flex gap-1">
                                    <div className={`w-1 h-1 ${colors.bg}`} />
                                    <div className={`w-1 h-1 ${colors.bg}`} />
                                    <div className={`w-1 h-1 ${colors.bg}`} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="md:col-span-2">
                                    <label className="block text-[9px] font-heading uppercase tracking-[0.2em] text-charcoal-500 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={profile.officerName}
                                        onChange={(e) => updateField('officerName', e.target.value)}
                                        readOnly={!editing}
                                        onClick={handleInputClick}
                                        className={`w-full bg-transparent border-b border-charcoal-800 py-2 text-xl font-heading font-bold text-white uppercase tracking-wide focus:outline-none focus:border-opacity-100 transition-colors ${editing ? `${colors.border} border-opacity-50` : 'border-transparent cursor-pointer'}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[9px] font-heading uppercase tracking-[0.2em] text-charcoal-500 mb-2">Rank / Role</label>
                                    <input
                                        type="text"
                                        value={profile.role}
                                        onChange={(e) => updateField('role', e.target.value)}
                                        readOnly={!editing}
                                        onClick={handleInputClick}
                                        className={`w-full bg-charcoal-900/30 border border-charcoal-800 rounded-sm px-4 py-3 text-sm font-mono text-charcoal-200 focus:outline-none focus:border-opacity-50 transition-all ${editing ? colors.inputFocus : 'cursor-pointer'}`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[9px] font-heading uppercase tracking-[0.2em] text-charcoal-500 mb-2">Assignment Location</label>
                                    <input
                                        type="text"
                                        value={profile.country}
                                        onChange={(e) => updateField('country', e.target.value)}
                                        readOnly={!editing}
                                        onClick={handleInputClick}
                                        className={`w-full bg-charcoal-900/30 border border-charcoal-800 rounded-sm px-4 py-3 text-sm font-mono text-charcoal-200 focus:outline-none focus:border-opacity-50 transition-all ${editing ? colors.inputFocus : 'cursor-pointer'}`}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[9px] font-heading uppercase tracking-[0.2em] text-charcoal-500 mb-2">Service Record / Bio</label>
                                    <textarea
                                        value={profile.bio}
                                        onChange={(e) => updateField('bio', e.target.value)}
                                        readOnly={!editing}
                                        onClick={handleInputClick}
                                        rows={3}
                                        className={`w-full bg-charcoal-900/30 border border-charcoal-800 rounded-sm px-4 py-3 text-sm font-mono text-charcoal-300 leading-relaxed focus:outline-none focus:border-opacity-50 transition-all resize-none ${editing ? colors.inputFocus : 'cursor-pointer'}`}
                                    />
                                </div>
                            </div>

                            {/* Interface Theme */}
                            <div className="mb-8 pt-8 border-t border-charcoal-800">
                                <label className="block text-[9px] font-heading uppercase tracking-[0.2em] text-charcoal-500 mb-4">Tactical Interface Theme</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {themes.map((theme) => {
                                        const isActive = profile.theme === theme.id;
                                        return (
                                            <button
                                                key={theme.id}
                                                onClick={() => editing ? updateField('theme', theme.id) : handleInputClick()}
                                                className={`relative px-4 py-3 border flex items-center justify-center gap-2 group transition-all ${isActive
                                                    ? `border-opacity-100 bg-white/5 ${themeColors[theme.id as keyof typeof themeColors].border}`
                                                    : 'border-charcoal-800 hover:border-charcoal-600'}`}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${theme.color} ${isActive ? 'animate-pulse' : ''}`} />
                                                <span className={`text-[10px] font-heading uppercase tracking-wider ${isActive ? 'text-white' : 'text-charcoal-400 group-hover:text-charcoal-200'}`}>
                                                    {theme.label}
                                                </span>
                                                {isActive && (
                                                    <div className={`absolute top-0 left-0 w-full h-[1px] ${theme.color}`} />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Comms Array */}
                            <div>
                                <label className="block text-[9px] font-heading uppercase tracking-[0.2em] text-charcoal-500 mb-4">Secure Comms Array</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['linkedin', 'instagram', 'facebook', 'x', 'email'].map((social) => (
                                        <div key={social} className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-heading uppercase tracking-wide text-charcoal-600 w-16 text-right">
                                                {social}
                                            </span>
                                            <input
                                                type="text"
                                                value={profile.socialLinks[social as keyof typeof profile.socialLinks] || ''}
                                                onChange={(e) => updateSocial(social, e.target.value)}
                                                readOnly={!editing}
                                                onClick={handleInputClick}
                                                placeholder="UNLINKED"
                                                className={`w-full bg-charcoal-900/20 border border-charcoal-800 rounded-sm pl-24 pr-4 py-2 text-xs font-mono text-charcoal-300 focus:outline-none focus:border-opacity-50 transition-all ${editing ? colors.inputFocus : 'cursor-pointer'}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
