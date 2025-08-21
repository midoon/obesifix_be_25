import express from "express";

export default function userRoutes(
  userController,
  authController,
  authMiddleware
) {
  const router = express.Router();

  // user auth
  router.post("/register", userController.createUser);
  router.post("/login/authjwt", authController.login);
  router.post("/refresh", authController.refresh);
  router.delete("/logout", authMiddleware.handler, authController.logout);

  return router;
}
