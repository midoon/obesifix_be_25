import {
  registerUserValidation,
  updateUserValidation,
} from "../../../infrastructure/validator/userValidation.js";

export default class UserController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
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

      if (!req.picture) {
        value.picture = null;
      }

      await this.userUseCase.create(value);
      res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Success register data",
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await this.userUseCase.getUser(userId);
      delete user.password;
      res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Success get data user",
        data: user,
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { error, value } = updateUserValidation(req.body);
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

      if (req.user.user_id !== req.params.userId) {
        throw new Error("Unauthorized");
      }

      const userId = req.params.userId;

      await this.userUseCase.update(userId, value);
      res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Success update data user",
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };
}
