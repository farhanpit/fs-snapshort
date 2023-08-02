
import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb://localhost:27017/my-Gallary'
  );

  return client;
}

export async function insertDocument(client:any, collection:any, document:any) {

  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllGellerys(client:any, collection:any, sort:any) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

  return documents;
}