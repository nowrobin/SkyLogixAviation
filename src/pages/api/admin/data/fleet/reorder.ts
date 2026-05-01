import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/admin/auth";
import { reorderFleet } from "@/lib/admin/dal";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) {
    return res.status(400).json({ error: "ids must be an array of strings" });
  }

  try {
    await reorderFleet(ids);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Reorder error:", err);
    return res.status(500).json({ error: "Failed to reorder fleet" });
  }
});
