import { NextApiRequest, NextApiResponse } from "next";
import { getMongoClient } from "../../services/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await getMongoClient();
  res.status(200).json({ ok: true });
}
