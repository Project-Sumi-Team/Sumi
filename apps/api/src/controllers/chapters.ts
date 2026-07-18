import { NextFunction, Request, Response } from "express";
import * as chaptersService from "../services/chapters";
import * as projectsService from "../services/projects";

export async function getChapters(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const project = await projectsService.getProjectById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const data = await chaptersService.getChaptersByProjectId(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function createChapter(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const project = await projectsService.getProjectById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const { title, order } = req.body as { title: string; order: number };
    if (!title || order === undefined) {
      return res.status(400).json({ error: "title and order are required" });
    }
    const chapter = await chaptersService.createChapter(id, { title, order });
    res.status(201).json(chapter);
  } catch (err) {
    next(err);
  }
}

export async function deleteChapter(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const deleted = await chaptersService.deleteChapter(id);
    if (!deleted) return res.status(404).json({ error: "Chapter not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
