/* https://api.podcastindex.org/api/1.0/recent/feeds?max=5&cat=102,health&lang=de,ja&pretty */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import apiHeaders from "../../utils/apiHeaders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q = "", mode = "", limit = 10, tag } = req.query;
  if (mode === "id") {
    try {
      const { data, status } = await axios({
        method: "get",
        url: `https://api.podcastindex.org/api/1.0/podcasts/byfeedid`,
        params: {
          pretty: true,
          id: q
        },
        headers: apiHeaders(),
      });

      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "An error occured⛔" });
    }
  }
  if (mode === "tag") {
    try {
      const { data, status } = await axios({
        method: "get",
        url: `https://api.podcastindex.org/api/1.0/recent/feeds`,
        params: {
          lang: "en",
          max: limit,
          pretty: true,
          cat: tag,
        },
        headers: apiHeaders(),
      });

      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "An error occured⛔" });
    }
  } 
  if(mode === "text") {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.podcastindex.org/api/1.0/search/byterm",
        headers: apiHeaders(),
        params: {
          pretty: true,
          lang: "en",
          q: q,
        },
      });
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "An error occured⛔" });
    }
  }
}
