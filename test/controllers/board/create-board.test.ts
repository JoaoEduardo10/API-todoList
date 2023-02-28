import { describe, expect, it } from "vitest";
import { CreateBoardController } from "../../../src/server/controller/board/create-board";
import { mockCreateBoardRepository } from "../../repositories/board/create-board.test";

const mockReq = {
  params: {},
  headers: {},
  body: {
    id: "123",
    boardName: "test",
    taskConnect: "123",
  },
};

describe("create-board  controller/create-board", () => {
  it("shuold return um board created end status codes 201", async () => {
    const repository = await new mockCreateBoardRepository();

    const controller = await new CreateBoardController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(201);
    expect(body).toEqual(mockReq.body);
  });
});
