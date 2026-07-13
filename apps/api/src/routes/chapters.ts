import { Router } from "express";
import * as chaptersController from "../controllers/chapters";
import * as pagesController from "../controllers/pages";

export const router = Router();

router.delete("/:id", chaptersController.deleteChapter);
router.get("/:chapterId/pages", pagesController.getPages);
router.post("/:chapterId/pages", pagesController.createPage);
