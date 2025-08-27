import express from "express";

export default function createServer(userRoutes, mlRoutes) {
  const app = express();
  app.use(express.json());

  app.use(userRoutes);
  app.use(mlRoutes);

  return app;
}
