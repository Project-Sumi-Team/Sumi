export interface Chapter {
  id: string;

  name: string;
  description?: string;
  order: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateChapterInput {
  name: string;
  description?: string;
}

export interface UpdateChapterInput {
  name?: string;
  description?: string;
}