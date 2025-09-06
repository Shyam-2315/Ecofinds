// src/hooks/useApi.ts

import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = "http://localhost:8000";

export const useApi = () => {
  const { token } = useAuth();

  const makeRequest = async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> => {
    const url = `${API_BASE_URL}${endpoint}`;

    // Ensure correct Content-Type for JSON requests, except file uploads
    const headers: HeadersInit = {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Optionally, get backend error message for easier debugging
    if (!response.ok) {
      let errorMsg = `API Error: ${response.status} ${response.statusText}`;
      try {
        const data = await response.json();
        if (data && data.detail) errorMsg = data.detail;
      } catch {
        // nothing
      }
      throw new Error(errorMsg);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  };

  return {
    get: (endpoint: string) => makeRequest(endpoint),
    post: (endpoint: string, data: any) =>
      makeRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    put: (endpoint: string, data: any) =>
      makeRequest(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (endpoint: string) =>
      makeRequest(endpoint, {
        method: "DELETE",
      }),
    uploadFile: async (endpoint: string, file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // No Content-Type; browser sets for FormData
        },
        body: formData,
      });

      if (!response.ok) {
        let errorMsg = `Upload Error: ${response.status} ${response.statusText}`;
        try {
          const data = await response.json();
          if (data && data.detail) errorMsg = data.detail;
        } catch {
          // nothing
        }
        throw new Error(errorMsg);
      }

      return response.json();
    },
  };
};
