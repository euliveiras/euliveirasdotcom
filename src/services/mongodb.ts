import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const db = "Cluster0";

export const getMongoClient = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    await client.db(db).command({ ping: 1 });
    console.log("Connected succesfuly to server!");
    return client;
  } catch (err) {
    console.log(err.message);
  }
};
