import mongoose from "mongoose";

const MongoDb = {
  async Connect(): Promise<void> {
    const url = process.env.MONGODB_URL as string;
    const password = process.env.MONGODB_PASSWORD;
    const username = process.env.MONGODB_USER;

    mongoose.set("strictQuery", true);

    await mongoose.connect(url, { auth: { password, username } }, (error) => {
      if (error) return console.error(error.message);

      console.log("Conectado ao banco de dados!");
    });
  },
};

export { MongoDb };
