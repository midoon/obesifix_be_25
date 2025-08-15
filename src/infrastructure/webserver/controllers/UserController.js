export default class UserController {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
  }

  createUser = async (req, res) => {
    try {
      // nanti diedit
      req.body.created_at = new Date();
      req.body.updated_at = new Date();
      req.body.picture = "imaeg";
      const user = await this.userUseCase.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
