import { describe, expect, it } from "vitest";
import { mockGetAllBoardRepository } from "../../repositories/boader/getAll-board.test";
import { GetAllBoardController } from "../../../src/server/controller/board/getAll-board";

const mockReq = {
  params: {},
  headers: {},
  body: "",
};

describe("getAll-board controller/getAll-board", () => {
  it("shuold return estatus code 201 end a arrey of board", async () => {
    const repositpry = await new mockGetAllBoardRepository();

    const controller = await new GetAllBoardController(repositpry);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body.length).toBe(1);
  });
});
