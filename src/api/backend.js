const BASE_URL = (import.meta.env.VITE_DB_BASE_URL || `http://${window.location.hostname}:5000`).replace(/\/$/, '');

// Semua API call backend di-prefix /api
export const backendFetch = async (endpoint, options = {}) => {
    const { body, token, ...customConfig } = options;
    const headers = { 'Content-Type': 'application/json' };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        method: options.method || (body ? 'POST' : 'GET'),
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    // Tambahkan /api prefix jika belum ada
    const normalizedEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;

    const res = await fetch(`${BASE_URL}${normalizedEndpoint}`, config);
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.msg || result.error || 'Terjadi kesalahan pada server');
    }

    return result;
};
