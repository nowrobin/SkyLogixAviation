import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/admin/auth";
import { readTraining, writeTraining } from "@/lib/admin/dal";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await readTraining();
      return res.status(200).json(data);
    } catch (err) {
      console.error("Failed to read training:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }
  }

  if (req.method === "PUT") {
    try {
      await writeTraining(req.body);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Failed to write training:", err);
      return res.status(500).json({ error: "Failed to save data" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
});
