import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import apiHeaders from "../../utils/apiHeaders";

export default async function handle(
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
  } catch {
    res.status(500).send({ message: "An error occured⛔" });
  }
}
