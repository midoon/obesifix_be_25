import { v4 } from "uuid";
import { registerUserValidation } from "../../../infrastructure/validator/userValidation.js";
import { encode } from "../../util/hash.js";

export default class UserController {
  constructor(userUseCase, configLoader) {
    this.userUseCase = userUseCase;
    this.configLoader = configLoader;
  }

  createUser = async (req, res) => {
    try {
      const { error, value } = registerUserValidation(req.body);
      if (error) {
        // ambil semua error per field
        const validationErrors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(403).json({
          status: false,
          message: validationErrors,
        });
      }
      const userData = value;

      userData.id = v4().toString();
      userData.password = await encode(userData.password, 10);
      userData.created_at = new Date();
      userData.updated_at = new Date();
      if (!userData.picture) {
        userData.picture = this.configLoader.DEFAULT_IMAGE_URL;
      }

      await this.userUseCase.create(userData);
      res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Success register data",
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };
}
