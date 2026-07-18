import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { projects } from "../db/schema";

export function getAllProjects() {
  return db.select().from(projects);
}

export async function getProjectById(id: string) {
  const rows = await db.select().from(projects).where(eq(projects.id, id));
  return rows[0] ?? null;
}

export async function createProject(data: {
  title: string;
  description?: string | null;
  ownerId: string;
}) {
  const rows = await db
    .insert(projects)
    .values({ title: data.title, description: data.description ?? null, ownerId: data.ownerId })
    .returning();
  return rows[0];
}

export async function deleteProject(id: string) {
  const rows = await db.delete(projects).where(eq(projects.id, id)).returning();
  return rows.length > 0;
}
