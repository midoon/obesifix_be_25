import express from "express";

export default function userRoutes(userController, authController) {
  const router = express.Router();

  router.post("/register", userController.createUser);
  router.post("/login/authjwt", authController.login);

  return router;
}
