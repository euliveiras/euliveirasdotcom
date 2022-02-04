import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../services/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (Object.is(req.method, "POST")) {
    const { uid } = req.body;
    try {
      const { db } = await connectToDatabase();
      const posts = await db

        .collection("posts")

        .find({})

        .sort({ metacritic: -1 })

        .limit(20)

        .toArray();

      return res.status(200).json(posts);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
