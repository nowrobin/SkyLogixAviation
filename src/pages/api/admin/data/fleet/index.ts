import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/admin/auth";
import { readFleet, createAircraft } from "@/lib/admin/dal";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await readFleet();
      return res.status(200).json(data);
    } catch (err) {
      console.error("Failed to read fleet:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }
  }

  if (req.method === "POST") {
    try {
      await createAircraft(req.body);
      return res.status(201).json({ success: true });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "P2002") {
        return res.status(409).json({ error: `ID "${req.body.id}" already exists. Please use a different registration number.` });
      }
      console.error("Failed to add aircraft:", err);
      return res.status(500).json({ error: "Failed to save data" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
});
