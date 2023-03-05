import mongoose from "mongoose";
import { afterEach, beforeEach } from "vitest";
import "dotenv/config";

beforeEach(async () => {
  const url = process.env.MONGODB_URL as string;
  const password = process.env.MONGODB_PASSWORD;
  const username = process.env.MONGODB_USER;

  console.log(url);

  mongoose.set("strictQuery", true);

  await mongoose.connect(url, { auth: { password, username } });
});

afterEach(async () => {
  await mongoose.connection.close();
});
