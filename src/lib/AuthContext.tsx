'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthState } from '@/types';
import { countries } from '@/data/countries';

interface AuthContextType {
    auth: AuthState;
    login: (country: string, code: string, name?: string) => boolean;
    signup: (name: string, country: string, code: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
    isInitialized: boolean;
}

const defaultAuth: AuthState = {
    isAuthenticated: false,
    country: '',
    accessCode: '',
    loginTime: '',
};

const AuthContext = createContext<AuthContextType>({
    auth: defaultAuth,
    login: () => false,
    signup: () => false,
    logout: () => { },
    isAuthenticated: false,
    isInitialized: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<AuthState>(defaultAuth);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('armory-x-auth');
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as AuthState;
                setAuth(parsed);
            } catch {
                localStorage.removeItem('armory-x-auth');
            }
        }
        setIsInitialized(true);
    }, []);

    const login = useCallback((countryCode: string, accessCode: string, name?: string): boolean => {
        const country = countries.find((c) => c.code === countryCode);
        if (!country) return false;
        if (country.accessCode !== accessCode.toUpperCase()) return false;

        const newAuth: AuthState = {
            isAuthenticated: true,
            country: countryCode,
            accessCode: country.accessCode,
            loginTime: new Date().toISOString(),
        };
        setAuth(newAuth);
        localStorage.setItem('armory-x-auth', JSON.stringify(newAuth));

        // If name is provided, create/update profile
        if (name) {
            let profile: any = {
                country: country.name,
                officerName: name,
                role: 'Logistics Officer',
                bio: 'Authorized personnel with access to defense logistics and inventory management systems.',
                theme: 'default',
                socialLinks: { linkedin: '', instagram: '', facebook: '', x: '', email: '' },
            };

            // Try to preserve existing profile data if available
            try {
                const existing = localStorage.getItem('armory-x-profile');
                if (existing) {
                    const parsed = JSON.parse(existing);
                    profile = { ...parsed, officerName: name, country: country.name };
                }
            } catch (e) {
                // ignore
            }

            localStorage.setItem('armory-x-profile', JSON.stringify(profile));
        }

        return true;
    }, []);

    const signup = useCallback((name: string, countryCode: string, accessCode: string): boolean => {
        const country = countries.find((c) => c.code === countryCode);
        if (!country) return false;
        if (country.accessCode !== accessCode.toUpperCase()) return false;

        const newAuth: AuthState = {
            isAuthenticated: true,
            country: countryCode,
            accessCode: country.accessCode,
            loginTime: new Date().toISOString(),
        };
        setAuth(newAuth);
        localStorage.setItem('armory-x-auth', JSON.stringify(newAuth));

        // Store registration profile
        const profile = {
            country: country.name,
            officerName: name,
            role: 'Logistics Officer',
            bio: 'Authorized personnel with access to defense logistics and inventory management systems.',
            theme: 'default',
            socialLinks: { linkedin: '', instagram: '', facebook: '', x: '', email: '' },
        };
        localStorage.setItem('armory-x-profile', JSON.stringify(profile));
        return true;
    }, []);

    const logout = useCallback(() => {
        setAuth(defaultAuth);
        localStorage.removeItem('armory-x-auth');
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, signup, logout, isAuthenticated: auth.isAuthenticated, isInitialized }}>
            {children}
        </AuthContext.Provider>
    );
}

