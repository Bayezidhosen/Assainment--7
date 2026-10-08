import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ??
  new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const mongoClient = client;

export const db = client.db("bazardor");