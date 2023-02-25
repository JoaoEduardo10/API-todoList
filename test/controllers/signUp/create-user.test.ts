import { describe } from "vitest";
import { expect, it } from "vitest";
import {
  IControllers,
  IHttReponse,
  IHttRequest,
} from "../../../src/server/controller/protocols";
import {
  ICreateUserparams,
  ICreateUserRepository,
} from "../../../src/server/controller/signUp/protocols";
import { IUser } from "../../../src/server/models/protocols";
import { TOmitPassword } from "../../../src/server/types/types";
import {
  mockcreateUser,
  mockcreateUserRepository,
} from "../../repositories/signUp/create-user.test";

class mockCreateUserController implements IControllers {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    req: IHttRequest<ICreateUserparams>
  ): Promise<IHttReponse<TOmitPassword<IUser>>> {
    const user = await this.createUserRepository.create(req.body!);

    return {
      body: user,
      statusCode: 201,
    };
  }
}

const reqParams = {
  params: "",
  headers: "",
  body: mockcreateUser,
};

describe("create-user controllers/signUp", () => {
  it("should returns statusCode 200 end body with an user", async () => {
    const repositoty = await new mockcreateUserRepository();

    const controller = await new mockCreateUserController(repositoty);

    const { body, statusCode } = await controller.handle(reqParams);

    expect(statusCode).toBe(201);

    expect(body.email).toEqual(reqParams.body.email);
    expect(body.name).toBe(reqParams.body.name);
    expect(body.id).toBe("123");
  });
});
