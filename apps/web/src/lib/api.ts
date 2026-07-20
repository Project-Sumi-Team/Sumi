const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL && typeof window !== "undefined") {
  console.warn(
    "VITE_API_URL environment variable is not set. API calls will fail."
  );
}

export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
  },

  projects: {
    list: "/projects",
    create: "/projects",
    get: (id: string) => `/projects/${id}`,
    update: (id: string) => `/projects/${id}`,
    delete: (id: string) => `/projects/${id}`,
  },

  chapters: {
    list: (projectId: string) =>
      `/projects/${projectId}/chapters`,
    create: "/chapters",
    get: (id: string) => `/chapters/${id}`,
    update: (id: string) => `/chapters/${id}`,
    delete: (id: string) => `/chapters/${id}`,
  },

  pages: {
    create: "/pages",
    get: (id: string) => `/pages/${id}`,
    update: (id: string) => `/pages/${id}`,
    delete: (id: string) => `/pages/${id}`,
  },

  export: {
    png: "/export/png",
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

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
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