import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

/**
 * Throws an error if the MongoDB URI is not present in environment variables.
 * @throws Will throw an error if MONGODB_URI is not defined in the environment variables.
 */
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to the environment variables");
}

const options = {};

/**
 * In development mode, this ensures that the MongoClient instance is reused across hot reloads.
 * This prevents creating new instances of MongoClient each time a change occurs.
 */
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient and connect.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * Exports a promise that resolves to the MongoClient instance.
 * @type {Promise<MongoClient>}
 */
export default clientPromise;
