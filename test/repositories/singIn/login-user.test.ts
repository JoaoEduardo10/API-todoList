import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { User } from "../../../src/server/models/mongo-models/User";
import { MongoLoginUserRepository } from "../../../src/server/repositories/signIn/login-user";

const user = {
  email: "string",
};

describe("login-user repository/signIn", () => {
  beforeEach(async () => {
    const createUser = await User.create({
      email: "test@gmail.com",
      name: "test",
      password: "123",
    });

    user.email = createUser.email;
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("should return a user existend", async () => {
    const repoditory = await new MongoLoginUserRepository().login(user.email);

    expect(repoditory.email).toBe(user.email);
    expect(typeof repoditory.id).toBe("string");
    expect(repoditory.name).toBe("test");
  });
});
