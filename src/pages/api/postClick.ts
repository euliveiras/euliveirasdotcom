import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../services/mongodb";

type Post = {
  uid: string;
  number_of_visits: number;
  visits_retained: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (Object.is(req.method, "POST")) {
    const { uid, first_visit, visit_retained } = req.body;
    try {
      const { client, db } = await connectToDatabase();
      const post = await db.collection("posts").findOne({ uid });

      if (Object.is(post, null) && first_visit) {
        const doc = { uid, number_of_visits: 1, visit_retained: 0 };

        try {
          const mongoResponse = await db.collection("posts").insertOne(doc);
          client.close();

          return res.status(200).json(mongoResponse);
        } catch (err) {
          return res.status(400).json(err.message);
        }
      }

      if (post !== null && first_visit) {
        const filter = { _id: post._id };
        const updatedDocument = {
          $set: {
            number_of_visits: ++post.number_of_visits,
          },
        };
        const result = await db
          .collection("posts")
          .updateOne(filter, updatedDocument);
        // console.log(result);
        return res.status(200).json(result);
      }

      if (visit_retained) {
        // console.log(req.body);
        const filter = { _id: post._id };
        const updatedDocument = {
          $set: {
            visit_retained: ++post.visit_retained,
          },
        };
        const result = await db
          .collection("posts")
          .updateOne(filter, updatedDocument);
        // console.log(result);
        return res.status(200).json(result);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
