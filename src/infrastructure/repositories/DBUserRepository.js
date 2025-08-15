import UserRepository from "../../app/interfaces/UserRepository.js";
import prisma from "../database/prismaClient.js";

export default class DBUserRepository extends UserRepository {
  async create(user) {
    return await prisma.user.create({
      data: {
        ...user, // ini bisa dilakukan jika object user atributenya sesuai dengan kolom pada prisma
      },
    });
  }

  async countByEmail(email) {
    return await prisma.user.count({
      where: {
        email: email,
      },
    });
  }

  async getByEmail(email) {}

  async getById(userId) {}

  async update(userId, payload) {}
}
