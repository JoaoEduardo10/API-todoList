import { RequestHandler } from "express";
import { IHttRequest } from "../../controller/protocols";
import { CreateUserController } from "../../controller/signUp/create-user";
import { ICreateUserparams } from "../../controller/signUp/protocols";
import { MongoCreateUserRepository } from "../../repositories/signUp/create-user";

// create an user
export const createUserRouter: RequestHandler = async (req, res) => {
  const mongoCreateUserRepository = await new MongoCreateUserRepository();

  const createUserController = await new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle(
    req as IHttRequest<ICreateUserparams>
  );

  res.status(statusCode).json(body);
};
