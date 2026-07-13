// TEMP — replace with shared types once available

export interface Chapter {
  id: string;
  projectId: string;
  title: string;
  order: number;
  createdAt: string;
}

export interface CreateChapterData {
  title: string;
  order?: number;
}
