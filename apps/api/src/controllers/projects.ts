import { NextFunction, Request, Response } from "express";
import * as projectsService from "../services/projects";

export async function getProjects(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await projectsService.getAllProjects();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getProject(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const project = await projectsService.getProjectById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function createProject(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, ownerId } = req.body as Record<string, string>;
    if (!title || !ownerId) {
      return res.status(400).json({ error: "title and ownerId are required" });
    }
    const project = await projectsService.createProject({ title, description, ownerId });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id as string;
    const deleted = await projectsService.deleteProject(id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
