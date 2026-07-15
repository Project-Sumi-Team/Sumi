import { create } from "zustand";
import { api, endpoints } from "../lib/api";
import type { Chapter, CreateChapterInput } from "../types/chapter";

interface ChapterState {
  chapters: Chapter[];
  loading: boolean;
  error: string | null;
  fetchChapters: (projectId: string) => Promise<void>;
  createChapter: (projectId: string, data: CreateChapterInput) => Promise<Chapter>;
  deleteChapter: (id: string) => Promise<void>;
}

export const useChapterStore = create<ChapterState>((set) => ({
  chapters: [],
  loading: false,
  error: null,

  fetchChapters: async (projectId) => {
    set({ loading: true, error: null });
    try {
      // TODO: confirm with Luna — endpoints.chapters has no "list" entry.
      // Guessing GET /projects/:projectId/chapters until she adds a real one.
      const chapters = await api<Chapter[]>(`/projects/${projectId}/chapters`);
      set({ chapters, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  createChapter: async (projectId, data) => {
    // TODO: confirm with Luna — CreateChapterInput has no projectId field,
    // but the create route is flat (POST /chapters), so projectId must be
    // sent in the body somehow. Sending it here as a guess.
    const chapter = await api<Chapter>(endpoints.chapters.create, {
      method: "POST",
      body: JSON.stringify({ ...data, projectId }),
    });
    set((s) => ({ chapters: [...s.chapters, chapter] }));
    return chapter;
  },

  deleteChapter: async (id) => {
    await api<void>(endpoints.chapters.delete(id), { method: "DELETE" });
    set((s) => ({ chapters: s.chapters.filter((c) => c.id !== id) }));
  },
}));
