const BASE_URL = (import.meta.env.VITE_DB_BASE_URL || `http://${window.location.hostname}:5000`).replace(/\/$/, '');

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

    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.msg || result.error || 'Terjadi kesalahan pada server');
    }

    return result;
};
