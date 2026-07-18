export interface Page {
  id: string;

  chapterId: string;

  pageNumber: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreatePageInput {
  chapterId: string;
}

export interface UpdatePageInput {
<<<<<<< HEAD
  pageNumber: number;
  editorData: unknown;
=======
  pageNumber: number
>>>>>>> origin/dorito/ui-foundation
}