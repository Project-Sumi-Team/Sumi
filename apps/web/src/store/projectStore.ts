import { create } from "zustand";
import { api, endpoints } from "../lib/api";
import type { Project, CreateProjectInput } from "../types/project";

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: CreateProjectInput) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const projects = await api<Project[]>(endpoints.projects.list);
      set({ projects, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  createProject: async (data) => {
    const project = await api<Project>(endpoints.projects.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
    set((s) => ({ projects: [...s.projects, project] }));
    return project;
  },

  deleteProject: async (id) => {
    await api<void>(endpoints.projects.delete(id), { method: "DELETE" });
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
  },
}));
