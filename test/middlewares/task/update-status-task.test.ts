import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("update-status middleware/update-status-task", () => {
  it("should returns 404 error from sending an id less than 24", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/1233/status")
      .send({});

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Id invalido!" });
  });

  it("should returns 404 error from sending a status", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/status")
      .send({});

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione um status" });
  });

  it("should returns 404 error from sending a status includes: concluded pending progress", async () => {
    const { statusCode, body } = await serverTest
      .patch("/tasks/63ff9e27777e30323ed90a65/status")
      .send({
        status: "amigo",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "So pode enviar os parametros: progress, pending, concluded",
    });
  });
});
