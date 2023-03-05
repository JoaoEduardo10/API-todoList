import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("update-complete-task middleware/upadate-complete-task", () => {
  it("should returns 404 error from sending an id less than 24", async () => {
    const { statusCode, body } = await serverTest
      .delete("/tasks/1233")
      .send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "id incompleto ou invalido" });
  });

  it("should returns 404 error from sending a wue id does not exist", async () => {
    const { statusCode, body } = await serverTest.delete(
      "/tasks/63ff9e27777e30323ed90a65"
    );

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "id da task não existe" });
  });
});
