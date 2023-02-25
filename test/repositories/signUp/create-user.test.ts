/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it } from "vitest";
import {
  ICreateUserparams,
  ICreateUserRepository,
} from "../../../src/server/controller/signUp/protocols";
import { IUser } from "../../../src/server/models/protocols";
import { TOmitPassword } from "../../../src/server/types/types";

export const mockcreateUser: ICreateUserparams = {
  email: "joao@gmail.com",
  name: "joao",
  password: "1234",
};

export class mockcreateUserRepository implements ICreateUserRepository {
  async create(params: ICreateUserparams): Promise<TOmitPassword<IUser>> {
    let dataBase: IUser;

    const user = () => {
      dataBase = {
        ...params,
        id: "123",
      };
    };

    user();

    return {
      id: dataBase!.id,
      name: dataBase!.name,
      email: dataBase!.email,
    };
  }
}

describe("create-user Repository/signUp", () => {
  it("should retuns a user", async () => {
    const repository = await new mockcreateUserRepository();

    const user = await repository.create(mockcreateUser);

    expect(user.email).toBe(mockcreateUser.email);
    expect(user.name).toBe(mockcreateUser.name);
    expect(user.id).toBe("123");
  });
});
