// TEMP — replace with generated API client once available

import type { Project, CreateProjectData } from "../types/project.temp";
import type { Chapter, CreateChapterData } from "../types/chapter.temp";
import type { Page, CreatePageData } from "../types/page.temp";

const BASE_URL = "http://localhost:3001/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
 if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export function getProjects(): Promise<Project[]> {
  return request("/projects");
}

export function getProject(id: string): Promise<Project> {
  return request(`/projects/${id}`);
}

export function createProject(data: CreateProjectData): Promise<Project> {
  return request("/projects", { method: "POST", body: JSON.stringify(data) });
}

export function deleteProject(id: string): Promise<void> {
  return request(`/projects/${id}`, { method: "DELETE" });
}

export function getChapters(projectId: string): Promise<Chapter[]> {
  return request(`/projects/${projectId}/chapters`);
}

export function createChapter(projectId: string, data: CreateChapterData): Promise<Chapter> {
  return request(`/projects/${projectId}/chapters`, { method: "POST", body: JSON.stringify(data) });
}

export function deleteChapter(id: string): Promise<void> {
  return request(`/chapters/${id}`, { method: "DELETE" });
}

export function getPages(chapterId: string): Promise<Page[]> {
  return request(`/chapters/${chapterId}/pages`);
}

export function getPage(id: string): Promise<Page> {
  return request(`/pages/${id}`);
}

export function createPage(chapterId: string, data: CreatePageData): Promise<Page> {
  return request(`/chapters/${chapterId}/pages`, { method: "POST", body: JSON.stringify(data) });
}

export function deletePage(id: string): Promise<void> {
  return request(`/pages/${id}`, { method: "DELETE" });
}
