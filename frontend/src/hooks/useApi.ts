import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = 'https://your-api-url.com/api';

export const useApi = () => {
  const { token } = useAuth();

  const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return {
    get: (endpoint: string) => makeRequest(endpoint),
    post: (endpoint: string, data: any) => makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    put: (endpoint: string, data: any) => makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (endpoint: string) => makeRequest(endpoint, {
      method: 'DELETE',
    }),
    uploadFile: async (endpoint: string, file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    },
  };
};