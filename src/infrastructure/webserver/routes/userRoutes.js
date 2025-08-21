import express from "express";

export default function userRoutes(userController, authController) {
  const router = express.Router();

  // user auth
  router.post("/register", userController.createUser);
  router.post("/login/authjwt", authController.login);
  router.post("/refresh", authController.refresh);

  return router;
}
