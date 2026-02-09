// API Client Utility
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Get stored token
export const getToken = () => localStorage.getItem('token');

// Store token
export const setToken = (token) => localStorage.setItem('token', token);

// Remove token
export const removeToken = () => localStorage.removeItem('token');

// Create headers with optional auth
const getHeaders = (includeAuth = true) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

// Generic fetch wrapper with error handling
async function request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: getHeaders(options.auth !== false),
    });

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || 'Request failed');
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}

// API methods
export const api = {
    get: (endpoint) => request(endpoint, { method: 'GET' }),

    post: (endpoint, body, options = {}) =>
        request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options
        }),

    put: (endpoint, body) =>
        request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        }),

    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

// Auth-specific API calls
export const authApi = {
    register: (data) => api.post('/auth/register', data, { auth: false }),
    login: (data) => api.post('/auth/login', data, { auth: false }),
    verifyOtp: (data) => api.post('/auth/verify-otp', data, { auth: false }),
    resendOtp: (data) => api.post('/auth/resend-otp', data, { auth: false }),
    googleAuth: (credential) => api.post('/auth/google', { credential }, { auth: false }),
    getMe: () => api.get('/auth/me'),
};

// Blog API calls
export const blogApi = {
    getBlogs: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.category) searchParams.append('category', params.category);
        if (params.search) searchParams.append('search', params.search);
        const query = searchParams.toString();
        return api.get(`/blogs${query ? `?${query}` : ''}`);
    },
    getBlogBySlug: (slug) => api.get(`/blogs/${slug}`),
    getCategories: () => api.get('/blogs/categories'),
};

// Admin Blog API calls
export const blogAdminApi = {
    createBlog: (data) => api.post('/blogs', data),
    updateBlog: (id, data) => api.put(`/blogs/${id}`, data),
    deleteBlog: (id) => api.delete(`/blogs/${id}`),
    createCategory: (data) => api.post('/blogs/categories', data),
    updateCategory: (id, data) => api.put(`/blogs/categories/${id}`, data),
    deleteCategory: (id) => api.delete(`/blogs/categories/${id}`),
};
