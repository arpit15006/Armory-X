export interface Asset {
    id: string;
    name: string;
    category: 'firearms' | 'vehicles' | 'equipment';
    description: string;
    frameDir: string;
    frameCount: number;
    framePrefix: string;
    specs: AssetSpec[];
    status: 'operational' | 'maintenance' | 'deployed' | 'reserve';
    classification: string;
    unitCount: number;
}

export interface AssetSpec {
    label: string;
    value: string;
}

export interface UserProfile {
    country: string;
    officerName: string;
    role: string;
    bio: string;
    profileImage: string;
    theme: 'default' | 'desert' | 'arctic' | 'naval';
    socialLinks: {
        linkedin?: string;
        instagram?: string;
        facebook?: string;
        x?: string;
        email?: string;
    };
}

export interface AuthState {
    isAuthenticated: boolean;
    country: string;
    accessCode: string;
    loginTime: string;
}

export interface InventoryFilter {
    category: string;
    status: string;
    search: string;
}
