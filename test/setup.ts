import mongoose from "mongoose";
import { afterEach, beforeEach } from "vitest";

beforeEach(async () => {
  const url = process.env.MONGODB_URL as string;
  const password = process.env.MONGODB_PASSWORD;
  const username = process.env.MONGODB_USER;

  mongoose.set("strictQuery", true);

  await mongoose.connect(url, { auth: { password, username } });
});

afterEach(async () => {
  await mongoose.connection.close();
});
