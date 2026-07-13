import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { pages } from "../db/schema";

export function getPagesByChapterId(chapterId: string) {
  return db.select().from(pages).where(eq(pages.chapterId, chapterId));
}

export async function getPageById(id: string) {
  const rows = await db.select().from(pages).where(eq(pages.id, id));
  return rows[0] ?? null;
}

export async function createPage(chapterId: string, data: { order?: number; width: number; height: number }) {
  const rows = await db
    .insert(pages)
    .values({ chapterId, order: data.order ?? 1, width: data.width, height: data.height })
    .returning();
  return rows[0];
}

export async function deletePage(id: string) {
  const rows = await db.delete(pages).where(eq(pages.id, id)).returning();
  return rows.length > 0;
}
