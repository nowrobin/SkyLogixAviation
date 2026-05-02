import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/admin/auth";
import { readFleetById, updateAircraft, deleteAircraft } from "@/lib/admin/dal";

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    try {
      const aircraft = await readFleetById(id);
      if (!aircraft) {
        return res.status(404).json({ error: "Aircraft not found" });
      }
      return res.status(200).json(aircraft);
    } catch (err) {
      console.error("Failed to read aircraft:", err);
      return res.status(500).json({ error: "Failed to read data" });
    }
  }

  if (req.method === "PUT") {
    try {
      await updateAircraft(id, req.body);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Failed to update aircraft:", err);
      return res.status(500).json({ error: "Failed to save data" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await deleteAircraft(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Failed to delete aircraft:", err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      return res.status(500).json({ error: `Failed to delete aircraft: ${msg}` });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
});
