import express from "express";

export default function createServer(userRoutes) {
  const app = express();
  app.use(express.json());

  app.use("/users", userRoutes);

  return app;
}
