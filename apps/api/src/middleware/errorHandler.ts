import { NextFunction, Request, Response } from "express";

interface PgError extends Error {
  code?: string;
}

export function errorHandler(err: PgError, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  if (err.code === "22P02") {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  if (err.code === "23503") {
    return res.status(400).json({ error: "Referenced resource does not exist" });
  }

  res.status(500).json({ error: "Internal server error" });
}
