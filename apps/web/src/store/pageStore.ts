import { create } from "zustand";
import * as api from "../lib/api.temp";
import type { Page, CreatePageData } from "../types/page.temp";

interface PageState {
  pages: Page[];
  loading: boolean;
  error: string | null;
  fetchPages: (chapterId: string) => Promise<void>;
  createPage: (chapterId: string, data: CreatePageData) => Promise<Page>;
  deletePage: (id: string) => Promise<void>;
}

export const usePageStore = create<PageState>((set) => ({
  pages: [],
  loading: false,
  error: null,

  fetchPages: async (chapterId) => {
    set({ loading: true, error: null });
    try {
      const pages = await api.getPages(chapterId);
      set({ pages, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  createPage: async (chapterId, data) => {
    const page = await api.createPage(chapterId, data);
    set((s) => ({ pages: [...s.pages, page] }));
    return page;
  },

  deletePage: async (id) => {
    await api.deletePage(id);
    set((s) => ({ pages: s.pages.filter((p) => p.id !== id) }));
  },
}));
