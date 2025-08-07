import { env } from "./config/env";
import { Server } from "./core";
import { connectMongo } from "./integrations/mongo/MongoConnection";

async function bootstrap() {
  await connectMongo();
  const server = new Server();
  server.listen(env.PORT);
}

bootstrap();
