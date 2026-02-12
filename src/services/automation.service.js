import { api } from '@/lib/api';

export const automationApi = {
  getAll: () => api.get('/automation'),
  getById: (id) => api.get(`/automation/${id}`),
  create: (data) => api.post('/automation', data),
  update: (id, data) => api.put(`/automation/${id}`, data),
  delete: (id) => api.delete(`/automation/${id}`),
  restart: (id) => api.post(`/automation/${id}/restart`),
  stop: (id) => api.post(`/automation/${id}/stop`),
  start: (id) => api.post(`/automation/${id}/start`),
  getMetrics: (id) => api.get(`/automation/${id}/metrics`),
  getLogs: (id, lines = 100) => api.get(`/automation/${id}/logs?lines=${lines}`),
  getEnvVars: (id) => api.get(`/automation/${id}/env`),
  updateEnvVars: (id, envVars) => api.put(`/automation/${id}/env`, { envVars }),
};

export default automationApi;
