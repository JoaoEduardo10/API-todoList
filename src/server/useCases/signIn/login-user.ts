import { RequestHandler } from "express";
import { LoginUserController } from "../../controller/singIn/login-user";
import { ILoginUserParams } from "../../controller/singIn/protocols";
import { MongoLoginUserRepository } from "../../repositories/signIn/login-user";

export const loginUserRouter: RequestHandler<{}, {}, ILoginUserParams> = async (
  req,
  res
) => {
  const mongoLoginUserReposiroty = await new MongoLoginUserRepository();

  const loginUserController = await new LoginUserController(
    mongoLoginUserReposiroty
  );

  const { body, statusCode } = await loginUserController.handle(req);

  res.status(statusCode).json(body);
};
