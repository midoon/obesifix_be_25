import User from "../../domain/entities/User.js";

export default class UserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create({
    id,
    name,
    email,
    password,
    age,
    gender,
    height,
    weight,
    activity,
    picture,
    food_type,
    created_at,
    updated_at,
  }) {
    const userIsExist = await this.userRepository.countByEmail(email);
    if (userIsExist) {
      throw new Error("Email already exists");
    }

    // create new user
    // argumen urutannya harus sesuai dengan parameter di constructor
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
      picture,
      food_type,
      created_at,
      updated_at
    );

    return this.userRepository.create(user);
  }
}
