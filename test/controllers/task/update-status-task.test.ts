import { describe, expect, it } from "vitest";
import { UpdateStatusTaskController } from "../../../src/server/controller/task/update-status-task";
import { IHttRequest } from "../../../src/server/controller/protocols";
import {
  IStatusParams,
  IUpdateStatusRepositopry,
} from "../../../src/server/controller/task/protocols";
import { ITasks } from "../../../src/server/models/protocols";

const mockReq: IHttRequest<IStatusParams> = {
  params: {
    statusId: "123",
  },
  headers: {},
  body: {
    status: "concluded",
  },
};

export class MockUpdateStatusTaskRepository
  implements IUpdateStatusRepositopry
{
  async update(id: string, params: IStatusParams): Promise<ITasks> {
    return {
      boardConnect: id,
      description: "test",
      id: id,
      status: params.status,
      subTasks: [
        {
          concluded: false,
          text: "test",
          uuid: id,
        },
      ],
      text: "test",
    };
  }
}

describe("update-status  controller/update-status-task", () => {
  it("should return status codes 200 with a new task", async () => {
    const repository = await new MockUpdateStatusTaskRepository();

    const controller = await new UpdateStatusTaskController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    const id = mockReq.params.statusId as string;

    expect(statusCode).toBe(200);
    expect(body.id).toBe(id);
    expect(body.description).toBe("test");
    expect(body.status).toBe(mockReq.body?.status);
    expect(body.subTasks.length).toBe(1);
    expect(body.text).toBe("test");
    expect(body.boardConnect).toBe(id);
  });
});
