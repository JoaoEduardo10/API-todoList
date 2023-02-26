import { RequestHandler } from "express";
import { CreateUserController } from "../../controller/signUp/create-user";
import { MongoCreateUserRepository } from "../../repositories/signUp/create-user";

// create an user
export const createUserRouter: RequestHandler = async (req, res) => {
  const mongoCreateUserRepository = await new MongoCreateUserRepository();

  const createUserController = await new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle(req);

  res.status(statusCode).json(body);
};
