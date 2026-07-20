import cors from "cors";
import "dotenv/config";

import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { router } from "./routes";

const required = ["DATABASE_URL"] as const;
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(cors({ 
  origin: [
    process.env.CORS_ORIGIN || "http://localhost:5173",
    "https://sumi-manga-editor.netlify.app"
  ],
  credentials: true 
}));
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
