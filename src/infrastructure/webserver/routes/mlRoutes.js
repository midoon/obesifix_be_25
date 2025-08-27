import express from "express";
import upload from "../middleware/upploadMiddleware.js";

export default function mlRoutes(mlController, authMiddleware) {
  const router = express.Router();

  router.post(
    "/prediction",
    authMiddleware.handler,
    upload.single("image"),
    mlController.classification
  );

  return router;
}
