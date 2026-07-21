import "dotenv/config";
import cors from "cors";
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

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
