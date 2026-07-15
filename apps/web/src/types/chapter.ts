export interface Chapter {
  id: string;

  name: string;
  description?: string;

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