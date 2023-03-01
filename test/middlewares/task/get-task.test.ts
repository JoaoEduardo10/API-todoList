import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("get-task middleware/get-task", () => {
  it("shuold returns error for not seting id.length greantest wur 24 with status code 404", async () => {
    const { statusCode, body } = await serverTest.get("/tesks/123").send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({});
  });
});
