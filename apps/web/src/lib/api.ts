<<<<<<< HEAD
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
=======
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

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
>>>>>>> origin/dorito/ui-foundation
  },

  chapters: {
    list: (projectId: string) =>
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/dorito/ui-foundation
  },
};

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
<<<<<<< HEAD
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is not configured. Set VITE_API_URL environment variable."
    );
  }

=======
>>>>>>> origin/dorito/ui-foundation
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
<<<<<<< HEAD
    name: string;
=======
    title: string;
>>>>>>> origin/dorito/ui-foundation
  }
) =>
  api(
    endpoints.chapters.create,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );