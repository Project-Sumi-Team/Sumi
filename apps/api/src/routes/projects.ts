import { Router } from "express";
import * as chaptersController from "../controllers/chapters";
import * as projectsController from "../controllers/projects";

export const router = Router();

router.get("/", projectsController.getProjects);
router.post("/", projectsController.createProject);
router.get("/:id", projectsController.getProject);
router.delete("/:id", projectsController.deleteProject);
router.get("/:id/chapters", chaptersController.getChapters);
router.post("/:id/chapters", chaptersController.createChapter);
