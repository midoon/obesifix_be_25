import express from "express";

export default function userRoutes(userController) {
  const router = express.Router();

  router.post("/register", userController.createUser);

  return router;
}
