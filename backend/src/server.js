import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import UserModel from './models/user';
import ImageModel from './models/image';
import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import * as fs from 'fs';
import express from 'express';
import cors from 'cors';
import path from "path";

const pubsub = createPubSub();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8' ),
    resolvers: {
      Query,
      Mutation,
      // Subscription
    },
  }),
  context: {
    pubsub,
    UserModel,
    ImageModel
  },
  graphqlEndpoint: '/'
});

const app = express();


if (process.env.NODE_ENV === "development") {
  console.log('development mode');
  app.use(cors());
}
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

app.use('/', yoga);

// const server = createServer(yoga);

// export default server;
export default app;

