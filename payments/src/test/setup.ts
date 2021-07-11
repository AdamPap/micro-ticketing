import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock("../nats-wrapper");

// set the env variable directly because we don't ahve access
// to the k8s cluster secret we set (during testing)
process.env.STRIPE_KEY =
  "sk_test_51JC1UPKxynnrJ1iqaBBxnnNbeDjA4w7zKzgV7w1iVLWSB72UJChAnK2FCfPiQxSJrVxc7H2tfrJBavksnpZjcMlD00gLAGfGkJ";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// @ts-ignore
global.signin = (id?: string) => {
  // Build jwt payload {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object {jwt: my_jwt}
  const session = { jwt: token };

  // Turn the session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string that is the cookie with encoded data
  return [`express:sess=${base64}`];
};
