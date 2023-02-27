import { describe, expect, it } from "vitest";
import { ILoginUserRepository } from "../../../src/server/controller/singIn/protocols";
import { IUser } from "../../../src/server/models/protocols";
import { TOmitPassword } from "../../../src/server/types/types";

export const mockLoginUser = {
  email: "test@gmail.com",
  password: "123",
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

describe("login-user middleware/signIn", () => {
  it("should return a user existend", async () => {
    const repoditory = await new mockLoginUserRepository().login(
      mockLoginUser.email
    );

    expect(repoditory.email).toBe(mockLoginUser.email);
    expect(repoditory.id).toBe("123");
    expect(repoditory.name).toBe("test");
  });
});
