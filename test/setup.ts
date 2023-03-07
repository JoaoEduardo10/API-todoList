import mongoose from "mongoose";
import { afterAll, beforeAll } from "vitest";
import "dotenv/config";

beforeAll(async () => {
  const url = process.env.MONGODB_URL as string;
  const password = process.env.MONGODB_PASSWORD;
  const username = process.env.MONGODB_USER;

  await mongoose.set("strictQuery", false);

  await mongoose.connect(url, { auth: { password, username } });
});

afterAll(async () => {
  await mongoose.connection.close();
});
