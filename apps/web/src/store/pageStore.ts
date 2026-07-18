import { create } from "zustand";
import { api, endpoints } from "../lib/api";
import type { Page, CreatePageInput } from "../types/page";

interface PageState {
  pages: Page[];
  loading: boolean;
  error: string | null;
  fetchPages: (chapterId: string) => Promise<void>;
  createPage: (chapterId: string) => Promise<Page>;
  deletePage: (id: string) => Promise<void>;
}

export const usePageStore = create<PageState>((set) => ({
  pages: [],
  loading: false,
  error: null,

  fetchPages: async (chapterId) => {
    set({ loading: true, error: null });
    try {
      // TODO: confirm with Luna — endpoints.pages has no "list" entry.
      // Guessing GET /chapters/:chapterId/pages until she adds a real one.
      const pages = await api<Page[]>(`/chapters/${chapterId}/pages`);
      set({ pages, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  createPage: async (chapterId) => {
    // Luna's real CreatePageInput is just { chapterId } — no pageNumber,
    // no canvas data. Backend presumably auto-assigns the page number.
    const data: CreatePageInput = { chapterId };
    const page = await api<Page>(endpoints.pages.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
    set((s) => ({ pages: [...s.pages, page] }));
    return page;
  },

  deletePage: async (id) => {
    await api<void>(endpoints.pages.delete(id), { method: "DELETE" });
    set((s) => ({ pages: s.pages.filter((p) => p.id !== id) }));
  },
}));
