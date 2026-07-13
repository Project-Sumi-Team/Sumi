import { Router } from "express";
import { router as chaptersRouter } from "./chapters";
import { router as pagesRouter } from "./pages";
import { router as projectsRouter } from "./projects";

export const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/projects", projectsRouter);
router.use("/chapters", chaptersRouter);
router.use("/pages", pagesRouter);
