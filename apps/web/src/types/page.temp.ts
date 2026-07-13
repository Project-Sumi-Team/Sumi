// TEMP — replace with shared types once available

export interface Page {
  id: string;
  chapterId: string;
  order: number;
  width: number;
  height: number;
  objects: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageData {
  order?: number;
  width: number;
  height: number;
}
