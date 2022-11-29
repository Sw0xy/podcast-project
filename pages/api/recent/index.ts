import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import apiHeaders from "../../../utils/apiHeaders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit = 10 } = req.query;
  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.podcastindex.org/api/1.0/recent/feeds`,
      params: {
        lang: "en",
        max: limit,
        pretty: true,
      },
      headers: apiHeaders(),
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "An error occured⛔" });
  }
}
