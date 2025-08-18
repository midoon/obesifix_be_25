import {} from "dotenv/config";

import UserUseCase from "./app/use_cases/UserUseCase.js";
import DBUserRepository from "./infrastructure/repositories/DBUserRepository.js";
import UserController from "./infrastructure/webserver/controllers/UserController.js";
import userRoutes from "./infrastructure/webserver/routes/userRoutes.js";
import createServer from "./infrastructure/webserver/server.js";
import { configLoader } from "./infrastructure/config/loader.js";

const configload = configLoader();

const userRepository = new DBUserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase, configload);
const routes = userRoutes(userController);

const app = createServer(routes);
app.listen(3000, () => console.log("server running on port 3000"));
