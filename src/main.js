import CreateUserUseCase from "./app/use_cases/UserUseCase";
import DBUserRepository from "./infrastructure/repositories/DBUserRepository";
import UserController from "./infrastructure/webserver/controllers/UserController";
import userRoutes from "./infrastructure/webserver/routes/userRoutes";
import createServer from "./infrastructure/webserver/server";

const userRepository = new DBUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);
const routes = userRoutes(userController);

const app = createServer(routes);
app.listen(3000, () => console.log("server running on port 3000"));
