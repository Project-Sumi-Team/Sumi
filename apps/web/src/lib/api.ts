const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL && typeof window !== "undefined") {
  console.warn(
    "VITE_API_URL environment variable is not set. API calls will fail."
  );
}

export const endpoints = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    me: "/api/auth/me",
  },

  projects: {
    list: "/api/projects",
    create: "/api/projects",
    get: (id: string) => `/api/projects/${id}`,
    update: (id: string) => `/api/projects/${id}`,
    delete: (id: string) => `/api/projects/${id}`,
  },

  chapters: {
    list: (projectId: string) =>
      `/api/projects/${projectId}/chapters`,
    create: "/api/chapters",
    get: (id: string) => `/api/chapters/${id}`,
    update: (id: string) => `/api/chapters/${id}`,
    delete: (id: string) => `/api/chapters/${id}`,
  },

  pages: {
    create: "/api/pages",
    get: (id: string) => `/api/pages/${id}`,
    update: (id: string) => `/api/pages/${id}`,
    delete: (id: string) => `/api/pages/${id}`,
  },

  export: {
    png: "/api/export/png",
  },
};

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is not configured. Set VITE_API_URL environment variable."
    );
  }

  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...options.headers,
      },
      ...options,
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      error || `Request failed (${response.status})`
    );
  }

  return response.json();
}

// Chapter Helpers

export const fetchChapters = (
  projectId: string
) =>
  api(endpoints.chapters.list(projectId));
  

export const createChapter = (
  data: {
    projectId: string;
    name: string;
  }
) =>
  api(
    endpoints.chapters.create,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );