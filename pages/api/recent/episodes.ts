/* `https://api.podcastindex.org/api/1.0/recent/episodes?lang=en&max=${limit}&pretty` */

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import apiHeaders from "../../../utils/apiHeaders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit = 10 } = req.query;
  try {
    const data = await axios({
      method: "get",
      url: `https://api.podcastindex.org/api/1.0/recent/episodes?lang=en&max=${limit}&pretty`,
      headers: apiHeaders(),
    });
    res.status(200).json(data.data);
  } catch {
    res.status(500).json({ message: "An error occured!⛔" });
  }
}
