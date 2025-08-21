import {
  loginUserValidation,
  refreshTokenValidation,
} from "../../validator/userValidation.js";

export default class AuthController {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  login = async (req, res) => {
    try {
      const { error, value } = loginUserValidation(req.body);
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

      const { accessToken, refreshToken, userId } =
        await this.authUseCase.login(value);

      res.status(200).send({
        status: true,
        stautsCode: 200,
        message: "Login success",
        data: {
          userId,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };

  refresh = async (req, res) => {
    try {
      const { error, value } = refreshTokenValidation(req.body);
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

      const { userId, accessToken } = await this.authUseCase.refresh(value);

      res.status(200).send({
        status: true,
        stautsCode: 200,
        message: "Login success",
        data: {
          userId,
          accessToken,
        },
      });
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };
}
