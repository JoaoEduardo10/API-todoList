import { LoginUserController } from "../../../src/server/controller/singIn/login-user";

import { ILoginUserRepository } from "../../../src/server/controller/singIn/protocols";
import { describe, expect, it } from "vitest";
import { IUser } from "../../../src/server/models/protocols";
import { TOmitPassword } from "../../../src/server/types/types";

const mockLoginUser = {
  email: "test@gmail.com",
  password: "123",
};

export const mockReq = {
  params: {},
  headers: {},
  body: mockLoginUser,
};

export class mockLoginUserRepository implements ILoginUserRepository {
  async login(email: string): Promise<TOmitPassword<IUser>> {
    let dataBase: TOmitPassword<IUser>;

    const main = () => {
      dataBase = {
        email: email,
        id: "123",
        name: "test",
      };
    };

    main();

    const { email: newEmail, id, name } = dataBase!;

    return { id, name, email: newEmail };
  }
}

describe("login-user controller/login-user", () => {
  it("should return a string end status code 200", async () => {
    const reposiory = new mockLoginUserRepository();

    const controller = new LoginUserController(reposiory);

    const { statusCode, body } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(typeof body).toBe("string");
  });
});
