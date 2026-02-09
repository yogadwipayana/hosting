import { api } from './api.js'

export const documentationApi = {
  // Fetch all documentation categories with their docs
  getCategories: () => api.get('/docs/categories'),

  // Fetch all docs with optional filtering
  getDocs: (params = {}) => {
    const searchParams = new URLSearchParams()
    if (params.category) searchParams.append('category', params.category)
    if (params.search) searchParams.append('search', params.search)
    const query = searchParams.toString()
    return api.get(`/docs${query ? `?${query}` : ''}`)
  },

  // Fetch single doc by ID or slug
  getDocById: (id) => api.get(`/docs/${id}`),

  // Search docs
  searchDocs: (query) => api.get(`/docs/search?q=${encodeURIComponent(query)}`),
}
