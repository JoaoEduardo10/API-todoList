import { IUser } from "../../models/protocols";
import { TOmitPassword } from "../../types/types";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { ICreateUserparams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IControllers {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    req: IHttRequest<ICreateUserparams>
  ): Promise<IHttReponse<TOmitPassword<IUser>>> {
    const { email, name, password } = req.body!;

    const user = await this.createUserRepository.create({
      email,
      name,
      password,
    });

    return {
      body: user,
      statusCode: 201,
    };
  }
}
