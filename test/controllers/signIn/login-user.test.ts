import jwt from "jsonwebtoken";

import {
  mockLoginUser,
  mockLoginUserRepository,
} from "../../repositories/singIn/login-user.test";
import {
  IControllers,
  IHttReponse,
  IHttRequest,
} from "../../../src/server/controller/protocols";
import {
  ILoginUserParams,
  ILoginUserRepository,
} from "../../../src/server/controller/singIn/protocols";
import { describe, expect, it } from "vitest";

export const mockReq = {
  params: {},
  headers: {},
  body: mockLoginUser,
};

class mockLoginUserController implements IControllers {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(
    req: IHttRequest<ILoginUserParams>
  ): Promise<IHttReponse<string>> {
    const { email } = req.body!;

    const user = await this.loginUserRepository.login(email);

    const token = jwt.sign(user, "test", { expiresIn: "24h" });

    return {
      body: token,
      statusCode: 200,
    };
  }
}

describe("login-user controller/login-user", () => {
  it("should return a string end status code 200", async () => {
    const controller = await new mockLoginUserController(
      new mockLoginUserRepository()
    );

    const { statusCode, body } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(typeof body).toBe("string");
  });
});
