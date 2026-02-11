const BASE_URL = (import.meta.env.VITE_DB_BASE_URL || `http://${window.location.hostname}:5000`).replace(/\/$/, '');

export const getImageUrl = (url, fallback = '/fallback.jpg') => {
    if (!url) return fallback;
    if (url.startsWith('http')) return url;
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    return `${BASE_URL}${normalizedUrl}`;
};
