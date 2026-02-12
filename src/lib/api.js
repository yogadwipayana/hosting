// API Client Utility
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Get stored token
export const getToken = () => localStorage.getItem('token');
export const getAdminToken = () => localStorage.getItem('admin_token');

// Store token
export const setToken = (token) => localStorage.setItem('token', token);
export const setAdminToken = (token) => localStorage.setItem('admin_token', token);

// Remove token
export const removeToken = () => localStorage.removeItem('token');
export const removeAdminToken = () => localStorage.removeItem('admin_token');

// Create headers with optional auth
const getHeaders = (authType = 'user') => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (authType === false) {
        return headers;
    }

    if (authType === 'user' || authType === true) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    } else if (authType === 'admin') {
        const token = getAdminToken();
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
        headers: getHeaders(options.auth === undefined ? 'user' : options.auth),
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
    adminLogin: (data) => api.post('/auth/admin/login', data, { auth: false }),
    verifyOtp: (data) => api.post('/auth/verify-otp', data, { auth: false }),
    resendOtp: (data) => api.post('/auth/resend-otp', data, { auth: false }),
    googleAuth: (credential) => api.post('/auth/google', { credential }, { auth: false }),
    getMe: () => api.get('/auth/me'),
    getMeAdmin: () => api.get('/auth/admin/me', { auth: 'admin' }),
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

// Project API calls
export const projectApi = {
    getProjects: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.status) searchParams.append('status', params.status);
        if (params.search) searchParams.append('search', params.search);
        const query = searchParams.toString();
        return api.get(`/projects${query ? `?${query}` : ''}`);
    },
    getProjectById: (id) => api.get(`/projects/${id}`),
    createProject: (data) => api.post('/projects', data),
    updateProject: (id, data) => api.put(`/projects/${id}`, data),
    deleteProject: (id) => api.delete(`/projects/${id}`),
};

// Credit API calls
export const creditApi = {
    // Get credit summary (balance + recent transactions)
    getCredits: () => api.get('/user/credits'),

    // Get paginated transaction history
    getTransactions: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.type) searchParams.append('type', params.type);
        if (params.status) searchParams.append('status', params.status);
        const query = searchParams.toString();
        return api.get(`/user/credits/transactions${query ? `?${query}` : ''}`);
    },

    // Get single transaction details
    getTransactionById: (id) => api.get(`/user/credits/transactions/${id}`),

    // Create top-up transaction
    createTopup: (data) => api.post('/user/credits/topup', data),

    // Cancel pending transaction
    cancelTransaction: (id, reason) => api.post(`/user/credits/transactions/${id}/cancel`, { reason }),
};

// Hosting API calls
export const hostingApi = {
    // Get all hostings with stats
    getHostings: () => api.get('/hosting'),

    // Get single hosting by ID
    getHostingById: (id) => api.get(`/hosting/${id}`),

    // Create new hosting
    createHosting: (data) => api.post('/hosting', data),

    // Update hosting
    updateHosting: (id, data) => api.put(`/hosting/${id}`, data),

    // Delete hosting
    deleteHosting: (id) => api.delete(`/hosting/${id}`),

    // Check domain availability
    checkDomain: (domain) => api.get(`/hosting/domains/check?domain=${encodeURIComponent(domain)}`),
};

// VPS API calls
export const vpsApi = {
    // Get all VPS with stats
    getVps: () => api.get('/vps'),

    // Get single VPS by ID
    getVpsById: (id) => api.get(`/vps/${id}`),

    // Create new VPS
    createVps: (data) => api.post('/vps', data),

    // Update VPS
    updateVps: (id, data) => api.put(`/vps/${id}`, data),

    // Delete VPS
    deleteVps: (id) => api.delete(`/vps/${id}`),

    // Reinstall VPS OS
    reinstallVps: (id, os) => api.post(`/vps/${id}/reinstall`, { os }),

    // Restart VPS
    restartVps: (id) => api.post(`/vps/${id}/restart`),

    // Stop VPS
    stopVps: (id) => api.post(`/vps/${id}/stop`),

    // Start VPS
    startVps: (id) => api.post(`/vps/${id}/start`),
};

// Database API calls
export const databaseApi = {
    // Get all databases with stats
    getDatabases: () => api.get('/database'),

    // Get single database by ID
    getDatabaseById: (id) => api.get(`/database/${id}`),

    // Create new database
    createDatabase: (data) => api.post('/database', data),

    // Update database
    updateDatabase: (id, data) => api.put(`/database/${id}`, data),

    // Delete database
    deleteDatabase: (id) => api.delete(`/database/${id}`),
};

// Product Catalog API calls
export const productCatalogApi = {
    // Get all products with optional filters
    getProducts: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.type) searchParams.append('type', params.type);
        if (params.active) searchParams.append('active', params.active);
        const query = searchParams.toString();
        return api.get(`/products${query ? `?${query}` : ''}`);
    },

    // Get single product by slug
    getProduct: (slug) => api.get(`/products/${slug}`),

    // Order a product (create instance)
    orderProduct: (slug, data) => api.post(`/products/${slug}/order`, data),

    // Get user's instances
    getUserInstances: (type) => {
        const params = type ? `?type=${type}` : '';
        return api.get(`/products/user/instances${params}`);
    },
};

// Admin Product API calls
export const productAdminApi = {
    // Create new product
    createProduct: (data) => api.post('/products', data),

    // Update product
    updateProduct: (id, data) => api.patch(`/products/${id}`, data),

    // Delete product
    deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Domain API calls
export const domainApi = {
    // Get list of supported TLDs
    getTlds: () => api.get('/domains/tlds'),

    // Check single domain availability
    checkDomain: (domain) => api.get(`/domains/check?domain=${encodeURIComponent(domain)}`),

    // Check domain with multiple TLDs
    checkDomainWithTlds: (name, tlds, options = {}) => {
        const tldParam = Array.isArray(tlds) ? tlds.join(',') : tlds;
        const { page = 1, limit = 10 } = options;
        return api.get(`/domains/check-all?name=${encodeURIComponent(name)}&tlds=${encodeURIComponent(tldParam)}&page=${page}&limit=${limit}`);
    },

    // Check domain with all TLDs from domain.txt
    checkDomainAllTlds: (name, options = {}) => {
        const { page = 1, limit = 10 } = options;
        return api.get(`/domains/check-all?name=${encodeURIComponent(name)}&page=${page}&limit=${limit}`);
    }
};

// Tools API calls
export const toolsApi = {
    // Check website uptime
    checkUptime: (url) => api.post('/tools/uptime', { url }, { auth: false }),
};

// Bookmark API calls
export const bookmarkApi = {
    // Get all bookmarks with optional filters
    getBookmarks: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.search) searchParams.append('search', params.search);
        if (params.category) searchParams.append('category', params.category);
        const query = searchParams.toString();
        return api.get(`/bookmarks${query ? `?${query}` : ''}`);
    },

    // Get single bookmark by ID
    getBookmarkById: (id) => api.get(`/bookmarks/${id}`),

    // Create new bookmark
    createBookmark: (data) => api.post('/bookmarks', data),

    // Update bookmark
    updateBookmark: (id, data) => api.put(`/bookmarks/${id}`, data),

    // Delete bookmark
    deleteBookmark: (id) => api.delete(`/bookmarks/${id}`),

    // Get unique categories
    getCategories: () => api.get('/bookmarks/categories'),
};

// Admin API calls
export const adminApi = {
    // Dashboard
    getDashboardStats: () => api.get('/admin/dashboard/stats', { auth: 'admin' }),

    // Users
    getUsers: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.search) searchParams.append('search', params.search);
        if (params.role) searchParams.append('role', params.role);
        if (params.isVerified !== undefined) searchParams.append('isVerified', params.isVerified);
        const query = searchParams.toString();
        return api.get(`/admin/users${query ? `?${query}` : ''}`, { auth: 'admin' });
    },
    getUserDetails: (id) => api.get(`/admin/users/${id}`, { auth: 'admin' }),
    updateUserRole: (id, role) => api.patch(`/admin/users/${id}/role`, { role }, { auth: 'admin' }),
    deleteUser: (id) => api.delete(`/admin/users/${id}`, { auth: 'admin' }),

    // Transactions
    getTransactions: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.status) searchParams.append('status', params.status);
        if (params.type) searchParams.append('type', params.type);
        if (params.search) searchParams.append('search', params.search);
        const query = searchParams.toString();
        return api.get(`/admin/transactions${query ? `?${query}` : ''}`, { auth: 'admin' });
    },
    updateTransactionStatus: (id, status, description) =>
        api.patch(`/admin/transactions/${id}/status`, { status, description }, { auth: 'admin' }),

    // Blogs
    getBlogs: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.search) searchParams.append('search', params.search);
        if (params.category) searchParams.append('category', params.category);
        if (params.isPublished !== undefined) searchParams.append('isPublished', params.isPublished);
        const query = searchParams.toString();
        return api.get(`/admin/blogs${query ? `?${query}` : ''}`, { auth: 'admin' });
    },
    toggleBlogPublish: (id) => api.patch(`/admin/blogs/${id}/toggle-publish`, {}, { auth: 'admin' }),

    // Categories
    getCategories: () => api.get('/admin/categories', { auth: 'admin' }),
    updateCategory: (id, data) => api.patch(`/admin/categories/${id}`, data, { auth: 'admin' }),
    deleteCategory: (id) => api.delete(`/admin/categories/${id}`, { auth: 'admin' }),

    // Admins
    getAdmins: () => api.get('/admin/admins', { auth: 'admin' }),
    createAdmin: (data) => api.post('/admin/admins', data, { auth: 'admin' }),
    toggleAdminStatus: (id) => api.patch(`/admin/admins/${id}/toggle-status`, {}, { auth: 'admin' }),
};
