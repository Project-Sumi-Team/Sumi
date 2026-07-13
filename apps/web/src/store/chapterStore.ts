import { create } from "zustand";
import * as api from "../lib/api.temp";
import type { Chapter, CreateChapterData } from "../types/chapter.temp";

interface ChapterState {
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
  fetchChapters: (projectId: string) => Promise<void>;
  createChapter: (projectId: string, data: CreateChapterData) => Promise<Chapter>;
  deleteChapter: (id: string) => Promise<void>;
}

export const useChapterStore = create<ChapterState>((set) => ({
  chapters: [],
  loading: false,
  error: null,

  fetchChapters: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const chapters = await api.getChapters(projectId);
      set({ chapters, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  createChapter: async (projectId, data) => {
    const chapter = await api.createChapter(projectId, data);
    set((s) => ({ chapters: [...s.chapters, chapter] }));
    return chapter;
  },

  deleteChapter: async (id) => {
    await api.deleteChapter(id);
    set((s) => ({ chapters: s.chapters.filter((c) => c.id !== id) }));
  },
}));
