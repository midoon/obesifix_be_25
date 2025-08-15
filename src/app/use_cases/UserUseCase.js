import User from "../../domain/entities/User";

export default class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    id,
    name,
    email,
    password,
    age,
    gender,
    height,
    weight,
    activity,
    food_type,
    created_at,
    updated_at,
  }) {
    const userIsExist = await this.userRepository.countByEmail(email);
    if (userIsExist) {
      throw new Error("Email already exists");
    }

    // create new user
    const user = new User(
      id,
      name,
      email,
      password,
      age,
      gender,
      height,
      weight,
      activity,
      food_type,
      created_at,
      updated_at
    );

    return this.userRepository.create(user);
  }
}
