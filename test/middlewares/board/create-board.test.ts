import { describe, expect, it } from "vitest";
import { serverTest } from "../../globals-test";

describe("create-boarder middleware/create-border", () => {
  it("shuold return erro 400 for not envied params boardName", async () => {
    const { statusCode, body } = await serverTest.post("/boards").send();

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Adicione o boardName" });
  });
});
