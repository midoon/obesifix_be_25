export default class UserController {
  constructor(createUserUsecase) {
    this.createUserUsecase = createUserUsecase;
  }

  createUser = async (req, res) => {
    try {
      // nanti diedit
      const user = await this.createUserUsecase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
