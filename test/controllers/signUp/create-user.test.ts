import { describe } from "vitest";
import { expect, it } from "vitest";
import {
  ICreateUserparams,
  ICreateUserRepository,
} from "../../../src/server/controller/signUp/protocols";
import { IUser } from "../../../src/server/models/protocols";
import { TOmitPassword } from "../../../src/server/types/types";
import { CreateUserController } from "../../../src/server/controller/signUp/create-user";
import { mockcreateUser } from "../../globals-test";

const reqParams = {
  params: {},
  headers: {},
  body: mockcreateUser,
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

describe("create-user controllers/signUp", () => {
  it("should returns statusCode 200 end body with an user", async () => {
    const repositoty = new mockcreateUserRepository();

    const controller = new CreateUserController(repositoty);

    const { body, statusCode } = await controller.handle(reqParams);

    expect(statusCode).toBe(201);

    expect(body.email).toEqual(reqParams.body.email);
    expect(body.name).toBe(reqParams.body.name);
    expect(body.id).toBe("123");
  });
});
