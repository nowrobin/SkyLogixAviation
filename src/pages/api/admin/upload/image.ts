import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/lib/admin/auth";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export const config = {
  api: { bodyParser: false },
};

const BUCKET = "aircraft-images";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const form = formidable({
    uploadDir: "/tmp",
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
  });

  try {
    const [fields, files] = await form.parse(req);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const dir = Array.isArray(fields.directory)
      ? fields.directory[0]
      : fields.directory ?? "";

    const originalName =
      (Array.isArray(fields.filename) ? fields.filename[0] : fields.filename) ||
      file.originalFilename ||
      `upload_${Date.now()}`;

    const ext = path.extname(file.originalFilename || ".jpg");
    const baseName = path.basename(originalName, path.extname(originalName));
    const timestamp = Date.now();
    const storagePath = dir
      ? `${dir}/${baseName}_${timestamp}${ext}`
      : `${baseName}_${timestamp}${ext}`;

    const fileBuffer = fs.readFileSync(file.filepath);
    const mimeType = file.mimetype || "image/jpeg";

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    // Clean up temp file — ignore if already gone
    try { fs.unlinkSync(file.filepath); } catch { /* no-op */ }

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return res.status(500).json({ error: uploadError.message });
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    return res.status(200).json({ path: urlData.publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Failed to upload file" });
  }
}
