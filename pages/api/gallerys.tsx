import { getGallerys } from "@/helper/api-util";
import {
  connectDatabase,
  getAllGellerys,
  insertDocument,
} from "@/helper/db-utils";
import { MongoClient } from "mongodb";

async function handler(req: any, res: any) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { title, category, imageUrl, description } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !category ||
      category.trim() === "" ||
      !imageUrl ||
      imageUrl.trim() === "" ||
      !description ||
      description.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newGallary = {
      _id: String,
      title,
      category,
      imageUrl,
      description,
    };

    let result;

    try {
      result = await insertDocument(client, "gallary", newGallary);
      newGallary._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Record insert Successfully!", data: newGallary });
    } catch (error) {
      res.status(500).json({ message: "Inserting gallary failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      console.log("colling methods........");
      const documents = await getAllGellerys(client, "gallary", { _id: -1 });
      //console.log("documents==",documents)

      res.status(200).json({ data: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting gallary failed." });
    }
  }

  client.close();
}

export default handler;
