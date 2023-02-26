import { RequestHandler } from "express";
import { ICreateUserparams } from "../../controller/signUp/protocols";
import { Bad_Request, Not_Fould } from "../../helpers/api-errors";
import validator from "validator";
import { createHashPassword } from "../../helpers/hashPassword";
import { User } from "../../models/mongo-models/User";

export const createUserMiddleware: RequestHandler<
  {},
  {},
  ICreateUserparams
> = async (req, res, next) => {
  const body = req.body;

  const allFieldsOfCreateUser: (keyof ICreateUserparams)[] = [
    "email",
    "name",
    "password",
  ];

  for (const field of allFieldsOfCreateUser) {
    if (!body?.[field]?.length) {
      throw new Bad_Request(
        `Campos de name, email e password é obrigatorio. Adicione ${field}`
      );
    }
  }

  const thereIsANon_RequiredField = Object.keys(body).some(
    (key) => !allFieldsOfCreateUser.includes(key as keyof ICreateUserparams)
  );

  if (thereIsANon_RequiredField) {
    throw new Bad_Request(
      "Só pode adicionar os campos de name, email e passoword!"
    );
  }

  const validateEmail = validator.isEmail(body.email);

  if (!validateEmail) {
    throw new Bad_Request("Formato de email invalido. adicione um @gmail.com");
  }

  const user = await User.findOne({ email: body.email });

  if (user) {
    throw new Not_Fould("Usuario já existente!");
  }

  const passwordHash = await createHashPassword(body.password);

  req.body.password = passwordHash;

  next();
};
