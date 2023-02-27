import { RequestHandler } from "express";
import { ILoginUserParams } from "../../controller/singIn/protocols";
import { Bad_Request, Not_Fould } from "../../helpers/api-errors";
import { comparePasswordHash } from "../../helpers/hashPassword";
import { User } from "../../models/mongo-models/User";

export const loginUserMiddlware: RequestHandler<
  {},
  {},
  ILoginUserParams
> = async (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Bad_Request("Email e password são obrigatórios.");
  }

  const allFieldsOfLogin: (keyof ILoginUserParams)[] = ["email", "password"];

  const thereIsANon_RequiredField = Object.keys(req.body).some(
    (key) => !allFieldsOfLogin.includes(key as keyof ILoginUserParams)
  );

  if (thereIsANon_RequiredField) {
    throw new Bad_Request("So pode enviar os campos de email e passoword");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Not_Fould("Email invalido!");
  }

  const passwordHash = await comparePasswordHash(password, user.password);

  if (!passwordHash) {
    throw new Not_Fould("Senha invalida!");
  }

  next();
};
