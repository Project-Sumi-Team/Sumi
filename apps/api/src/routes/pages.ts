import { Router } from "express";
import * as pagesController from "../controllers/pages";

export const router = Router();

router.delete("/:id", pagesController.deletePage);
router.get("/:id", pagesController.getPage);
