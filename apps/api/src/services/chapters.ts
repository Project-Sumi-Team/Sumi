import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { chapters } from "../db/schema";

export function getChaptersByProjectId(projectId: string) {
  return db.select().from(chapters).where(eq(chapters.projectId, projectId));
}

export async function getChapterById(id: string) {
  const rows = await db.select().from(chapters).where(eq(chapters.id, id));
  return rows[0] ?? null;
}

export async function createChapter(projectId: string, data: { title: string; order: number }) {
  const rows = await db
    .insert(chapters)
    .values({ projectId, title: data.title, order: data.order })
    .returning();
  return rows[0];
}

export async function deleteChapter(id: string) {
  const rows = await db.delete(chapters).where(eq(chapters.id, id)).returning();
  return rows.length > 0;
}
