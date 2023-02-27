import { createJwt } from "../../helpers/jwt-user";
import { IControllers, IHttReponse, IHttRequest } from "../protocols";
import { ILoginUserParams, ILoginUserRepository } from "./protocols";

export class LoginUserController implements IControllers {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(
    req: IHttRequest<ILoginUserParams>
  ): Promise<IHttReponse<string>> {
    const { email } = req.body!;

    const user = await this.loginUserRepository.login(email);

    const token = createJwt(user);

    return {
      body: token,
      statusCode: 200,
    };
  }
}
