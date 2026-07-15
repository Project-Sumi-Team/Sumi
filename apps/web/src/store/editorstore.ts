import { create } from "zustand";
import type { CanvasObject, Tool } from "../types/editor";

interface EditorStore {
  // Tool State
  selectedTool: Tool;

  // Canvas State
  objects: CanvasObject[];

  // Selection State
  selectedObjectId: string | null;

  // Tool Actions
  setTool: (tool: Tool) => void;

  // Object Actions
  addObject: (object: CanvasObject) => void;
  updateObject: (
    id: string,
    updates: Partial<CanvasObject>
  ) => void;
  deleteObject: (id: string) => void;

  // Selection Actions
  selectObject: (id: string | null) => void;
  clearSelection: () => void;

  // Utility Actions
  clearCanvas: () => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  // Initial State
  selectedTool: "select",
  objects: [],
  selectedObjectId: null,

  // Tool Actions
  setTool: (tool) =>
    set({
      selectedTool: tool,
    }),

  // Object Actions
  addObject: (object) =>
    set((state) => ({
      objects: [...state.objects, object],
    })),

  updateObject: (id, updates) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id
          ? ({ ...obj, ...updates } as CanvasObject)
          : obj
      ),
    })),

  deleteObject: (id) =>
    set((state) => ({
      objects: state.objects.filter(
        (obj) => obj.id !== id
      ),
      selectedObjectId:
        state.selectedObjectId === id
          ? null
          : state.selectedObjectId,
    })),

  // Selection Actions
  selectObject: (id) =>
    set({
      selectedObjectId: id,
    }),

  clearSelection: () =>
    set({
      selectedObjectId: null,
    }),

  // Utility Actions
  clearCanvas: () =>
    set({
      objects: [],
      selectedObjectId: null,
    }),
}));