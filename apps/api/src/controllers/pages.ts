import { NextFunction, Request, Response } from "express";
import * as chaptersService from "../services/chapters";
import * as pagesService from "../services/pages";

export async function getPages(req: Request, res: Response, next: NextFunction) {
  try {
    const chapterId = req.params.chapterId as string;
    const chapter = await chaptersService.getChapterById(chapterId);
    if (!chapter) return res.status(404).json({ error: "Chapter not found" });
    const data = await pagesService.getPagesByChapterId(chapterId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getPage(req: Request, res: Response, next: NextFunction) {
  try {
    const page = await pagesService.getPageById(req.params.id as string);
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (err) {
    next(err);
  }
}

export async function createPage(req: Request, res: Response, next: NextFunction) {
  try {
    const chapterId = req.params.chapterId as string;
    const chapter = await chaptersService.getChapterById(chapterId);
    if (!chapter) return res.status(404).json({ error: "Chapter not found" });
    const { order, width, height } = req.body as { order?: number; width: number; height: number };
    if (width === undefined || height === undefined) {
      return res.status(400).json({ error: "width and height are required" });
    }
    const page = await pagesService.createPage(chapterId, { order, width, height });
    res.status(201).json(page);
  } catch (err) {
    next(err);
  }
}

export async function deletePage(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await pagesService.deletePage(req.params.id as string);
    if (!deleted) return res.status(404).json({ error: "Page not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
