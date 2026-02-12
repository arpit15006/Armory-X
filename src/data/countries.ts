export const countries = [
    { code: 'US', name: 'United States', accessCode: 'EAGLE-7' },
    { code: 'UK', name: 'United Kingdom', accessCode: 'CROWN-3' },
    { code: 'FR', name: 'France', accessCode: 'TRICOLOR-9' },
    { code: 'DE', name: 'Germany', accessCode: 'IRON-5' },
    { code: 'IN', name: 'India', accessCode: 'SHIELD-1' },
    { code: 'JP', name: 'Japan', accessCode: 'RISING-6' },
    { code: 'AU', name: 'Australia', accessCode: 'OUTBACK-4' },
    { code: 'CA', name: 'Canada', accessCode: 'MAPLE-8' },
    { code: 'IL', name: 'Israel', accessCode: 'MAGEN-2' },
    { code: 'KR', name: 'South Korea', accessCode: 'PANTHER-7' },
    { code: 'BR', name: 'Brazil', accessCode: 'VERDE-5' },
    { code: 'IT', name: 'Italy', accessCode: 'LEGION-3' },
];

export const getCountryByCode = (code: string) => {
    return countries.find((c) => c.code === code);
};
