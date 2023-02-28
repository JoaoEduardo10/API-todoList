import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("get-board middleware/get-board", () => {
  it("should return status codes 404 for not setding id correct", async () => {
    const { statusCode, body } = await serverTest.get("/boards/231425");

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id invalido!" });
  });
});
