import { describe, expect, it } from "vitest";

import { CreateBoardControllers } from "../../../src/server/controller/board/create-board";

import { mockCreateBoarderRepository } from "../../repositories/boader/create-board.test";

const mockReq = {
  params: {},
  headers: {},
  body: {
    boardName: "test",
    id: "123",
    taks: [{ task: "123" }],
  },
};

describe("create-board controller/create-board", () => {
  it("shuold return status codes 201 end Board", async () => {
    const repository = await new mockCreateBoarderRepository();

    const controller = await new CreateBoardControllers(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(201);

    expect(body).toEqual(mockReq.body);
  });
});
