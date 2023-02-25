import { MongoDb } from "./dataBase/mongoDb";
import { server } from "./server/server";

MongoDb.Connect().then(() => {
  const PORT = process.env.PORT;

  server.listen(PORT, () => console.log(`Servidor iniciado na porta: ${PORT}`));
});
