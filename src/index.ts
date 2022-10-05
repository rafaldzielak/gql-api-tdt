import dotenv from "dotenv";
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { resolvers } from "./resolvers";
dotenv.config();

async function bootstrap() {
  // Build the schema
  const schema = await buildSchema({
    resolvers,
    // authChecker,
  });
  // Initialize express
  const app = express();
  app.use(cookieParser());
  // Create apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      console.log(ctx);
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });
  await server.start();
  // apply middleware to server
  server.applyMiddleware({ app });
  // app.listen on express server
  app.listen({ port: 4000 }, () => console.log("App listening on port localhost:4000"));
  // connect to DB
}

bootstrap();

console.log("Hello");
