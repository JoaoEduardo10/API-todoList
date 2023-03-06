import { describe, expect, it } from "vitest";
import { CreateBoardController } from "../../../src/server/controller/board/create-board";
import {
  ICreateBoardParams,
  ICreateBoardRepository,
} from "../../../src/server/controller/board/protocols";
import { IBoard } from "../../../src/server/models/protocols";

const mockReq = {
  params: {},
  headers: {},
  body: {
    id: "123",
    boardName: "test",
    taskConnect: "123",
  },
};

export class mockCreateBoardRepository implements ICreateBoardRepository {
  async create(params: ICreateBoardParams, userId: any): Promise<IBoard> {
    const { boardName } = params;

    return { boardName, id: "123", taskConnect: "123", userId };
  }
}

describe("create-board  controller/create-board", () => {
  it("shuold return um board created end status codes 201", async () => {
    const repository = new mockCreateBoardRepository();

    const controller = new CreateBoardController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(201);
    expect(body).toEqual(mockReq.body);
  });
});
