import { RequestHandler } from "express";
import { Unauthorezid } from "../helpers/api-errors";
import { compareJwt } from "../helpers/jwt-user";
import { User } from "../models/mongo-models/User";

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const authorization = req.headers.authorization as string;

  if (!authorization) {
    throw new Unauthorezid("Voçê não esta altenticado.!");
  }

  const [type, token] = authorization.split(" ");

  if (type != "Bearer") {
    throw new Unauthorezid("Tipo de token invalido!");
  }

  const verifyToken = compareJwt(token);

  const user = User.findById(verifyToken.id);

  if (!user) {
    throw new Unauthorezid("Token invalido!");
  }

  next();
};
