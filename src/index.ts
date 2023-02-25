import { server } from "./server/server";

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Servidor iniciado na porta: ${PORT}`));
