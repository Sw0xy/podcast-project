import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import apiHeaders from "../../utils/apiHeaders";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.podcastindex.org/api/1.0/categories/list",
      headers: apiHeaders(),
      params: {
        pretty: true,
      },
    });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: "An error occured⛔" });
  }
}
