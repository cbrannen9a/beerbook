import type { NextApiRequest, NextApiResponse } from "next";
import { getAllBrews } from "@/lib-server";

export default async (_: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const test = await getAllBrews();
  res.status(200).json(test);
};
