import {} from "dotenv/config";

import UserUseCase from "./app/use_cases/UserUseCase.js";
import AuthUseCase from "./app/use_cases/AuthUseCase.js";

import DBUserRepository from "./infrastructure/repositories/DBUserRepository.js";
import DBTokenRepository from "./infrastructure/repositories/DBTokenRepository.js";

import UserController from "./infrastructure/webserver/controllers/UserController.js";
import AuthController from "./infrastructure/webserver/controllers/AuthController.js";

import userRoutes from "./infrastructure/webserver/routes/userRoutes.js";
import createServer from "./infrastructure/webserver/server.js";
import { configLoader } from "./infrastructure/config/loader.js";

const configload = configLoader();

const userRepository = new DBUserRepository();
const tokenRepository = new DBTokenRepository();

const userUseCase = new UserUseCase(userRepository);
const authUseCase = new AuthUseCase(
  userRepository,
  tokenRepository,
  configload
);

const userController = new UserController(userUseCase, configload);
const authController = new AuthController(authUseCase);
const routes = userRoutes(userController, authController);

const app = createServer(routes);
app.listen(3000, () => console.log("server running on port 3000"));
