import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header if access token exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor to automatically refresh tokens on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/token/')) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }).catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('portfolio_refresh_token');
      if (!refreshToken) {
        localStorage.removeItem('portfolio_access_token');
        localStorage.removeItem('portfolio_refresh_token');
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });
        const newAccess = res.data.access;
        localStorage.setItem('portfolio_access_token', newAccess);
        if (res.data.refresh) {
          localStorage.setItem('portfolio_refresh_token', res.data.refresh);
        }
        apiClient.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        processQueue(null, newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('portfolio_access_token');
        localStorage.removeItem('portfolio_refresh_token');
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// -------------------------------------------------------------
// Public Endpoints
// -------------------------------------------------------------
export const getPortfolioData = async () => {
  const response = await apiClient.get('/portfolio/');
  return response.data;
};

export const getPublicProjects = async (params = {}) => {
  const response = await apiClient.get('/projects/', { params });
  return response.data;
};

export const getPublicProjectDetail = async (slug) => {
  const response = await apiClient.get(`/projects/${slug}/`);
  return response.data;
};

export const submitContact = async (formData) => {
  const response = await apiClient.post('/contact/', formData);
  return response.data;
};

// -------------------------------------------------------------
// Auth Endpoints
// -------------------------------------------------------------
export const loginApi = async (username, password) => {
  const response = await apiClient.post('/auth/token/', { username, password });
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await apiClient.get('/auth/me/');
  return response.data;
};

// -------------------------------------------------------------
// Admin Endpoints
// -------------------------------------------------------------
export const getAdminDashboardStats = async () => {
  const response = await apiClient.get('/admin/dashboard-stats/');
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await apiClient.get('/admin/profile/');
  return response.data;
};

export const updateAdminProfile = async (formData) => {
  // Can be FormData for image uploads or JSON
  const isMultipart = formData instanceof FormData;
  const response = await apiClient.put('/admin/profile/', formData, {
    headers: isMultipart ? { 'Content-Type': 'multipart/form-data' } : {},
  });
  return response.data;
};

// Generic CRUD helpers
export const createCrudService = (resource) => ({
  list: async (params = {}) => {
    const res = await apiClient.get(`/admin/${resource}/`, { params });
    return res.data;
  },
  get: async (id) => {
    const res = await apiClient.get(`/admin/${resource}/${id}/`);
    return res.data;
  },
  create: async (data) => {
    const isMultipart = data instanceof FormData;
    const res = await apiClient.post(`/admin/${resource}/`, data, {
      headers: isMultipart ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return res.data;
  },
  update: async (id, data) => {
    const isMultipart = data instanceof FormData;
    const res = await apiClient.put(`/admin/${resource}/${id}/`, data, {
      headers: isMultipart ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return res.data;
  },
  partialUpdate: async (id, data) => {
    const isMultipart = data instanceof FormData;
    const res = await apiClient.patch(`/admin/${resource}/${id}/`, data, {
      headers: isMultipart ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return res.data;
  },
  delete: async (id) => {
    const res = await apiClient.delete(`/admin/${resource}/${id}/`);
    return res.data;
  },
});

export const projectsService = createCrudService('projects');
export const projectCategoriesService = createCrudService('project-categories');
export const skillsService = createCrudService('skills');
export const skillCategoriesService = createCrudService('skill-categories');
export const experiencesService = createCrudService('experiences');
export const educationsService = createCrudService('educations');
export const certificationsService = createCrudService('certifications');
export const achievementsService = createCrudService('achievements');
export const socialLinksService = createCrudService('social-links');
export const resumesService = createCrudService('resumes');
export const messagesService = createCrudService('messages');
