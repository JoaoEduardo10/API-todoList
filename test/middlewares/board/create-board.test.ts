import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("create-board  middleware/create-board", () => {
  it("should returns status code 400 for not sending params boardName", async () => {
    const { statusCode, body } = await serverTest.post("/boards").send();

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicone o titulo ao board" });
  });
});
