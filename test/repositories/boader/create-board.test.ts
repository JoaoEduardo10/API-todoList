import { describe, expect, it } from "vitest";
import {
  ICreateBoardParams,
  ICreateBoardRepository,
} from "../../../src/server/controller/board/protocols";
import { IBoard } from "../../../src/server/models/protocols";

export class mockCreateBoarderRepository implements ICreateBoardRepository {
  async create(params: ICreateBoardParams): Promise<IBoard> {
    const { boardName } = params;

    return { boardName, id: "123", taks: [{ task: "123" }] };
  }
}

describe("create-boarde repository/create-border", () => {
  it("shuold return a board created", async () => {
    const repository = await new mockCreateBoarderRepository().create({
      boardName: "test",
    });

    expect(repository.boardName).toBe("test");
    expect(repository.id).toBe("123");
    expect(repository.taks.length).toBe(1);
  });
});
