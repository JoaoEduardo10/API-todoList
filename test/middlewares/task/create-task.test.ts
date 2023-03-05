import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("create-task middlewre/create-task", () => {
  it("shuold returns error for not seting text with status code 400", async () => {
    const { statusCode, body } = await serverTest.post("/tasks").send({});

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione uma texto" });
  });

  it("shuold returns error for not seting desription.length greantest wur four with status code 400", async () => {
    const { statusCode, body } = await serverTest.post("/tasks").send({
      text: "test",
      description: "123",
    });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Descrição deve conter no minimo 4 letras" });
  });

  it("shuold returns error for not seting desription.length greantest wur four with status code 400", async () => {
    const { statusCode, body } = await serverTest.post("/tasks").send({
      description: "123",
    });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione uma texto" });
  });

  it("shuold returns error for not seting boardConnect with status code 400", async () => {
    const { statusCode, body } = await serverTest.post("/tasks").send({
      text: "test",
      description: "1234",
    });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "adicone o BoardConnect que vem do taskConnect da board",
    });
  });

  it("shuold returns error for not seting subTasks with status code 400", async () => {
    const { statusCode, body } = await serverTest.post("/tasks").send({
      text: "test",
      description: "1234",
      boardConnect: "123",
    });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "Adicione pelo menos uma subTask",
    });
  });

  it("shuold returns error for not seting subTasks with status code 400", async () => {
    const { statusCode, body } = await serverTest.post("/tasks").send({
      text: "test",
      description: "1234",
      boardConnect: "123",
      subTasks: [{ text: "" }],
    });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "Adicione uma texto a subTask",
    });
  });
});
