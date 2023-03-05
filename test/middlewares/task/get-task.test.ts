import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("get-task middleware/get-task", () => {
  it("shuold returns error for not seting id.length greantest wur 24 with status code 404", async () => {
    const { statusCode, body } = await serverTest.get(
      "/tasks/63ff9e27777e30323ed90a655"
    );

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id invalido!" });
  });

  it("should returns 404 error from sending an id not existe", async () => {
    const { statusCode, body } = await serverTest
      .get("/tasks/63ff9e27777e30323ed90a66")
      .send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Task não existe!" });
  });
});
