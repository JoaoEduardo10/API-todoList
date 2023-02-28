import { describe, expect, it } from "vitest";
import { GetBoardController } from "../../../src/server/controller/board/get-board";
import { MockGetBoardRepository } from "../../repositories/board/get-board.test";
import { IGetBoard } from "../../../src/server/controller/board/protocols";

const mockBody: IGetBoard = {
  boardName: "test",
  id: "123",
  taskConnect: "123",
  tasks: [
    {
      boardConnect: "123",
      description: "test",
      status: "pending",
      text: "test",
      _id: "123",
    },
  ],
};

const mockReq = {
  params: {
    boardId: mockBody.id,
  },
  headrs: {},
  body: mockBody,
};

describe("get-board controller/get-board", () => {
  it("shuold returns status codes 200 end board with tasks", async () => {
    const repository = await new MockGetBoardRepository();

    const controler = await new GetBoardController(repository);

    const { body, statusCode } = await controler.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body).toEqual(mockBody);
  });
});
