import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/lib/admin/auth";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

  const uploadDir = path.join(process.cwd(), "public");

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  try {
    const [fields, files] = await form.parse(req);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get target directory from fields
    const dir = Array.isArray(fields.directory)
      ? fields.directory[0]
      : fields.directory;
    const targetDir = dir ? path.join(uploadDir, dir) : uploadDir;

    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Get original filename or use a generated one
    const originalName =
      (Array.isArray(fields.filename) ? fields.filename[0] : fields.filename) ||
      file.originalFilename ||
      `upload_${Date.now()}`;

    const ext = path.extname(file.originalFilename || ".jpg");
    const baseName = path.basename(originalName, path.extname(originalName));
    const finalName = `${baseName}${ext}`;
    const finalPath = path.join(targetDir, finalName);

    // Move file from temp location to target
    fs.renameSync(file.filepath, finalPath);

    const publicPath = `/${dir ? dir + "/" : ""}${finalName}`;

    return res.status(200).json({ path: publicPath });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Failed to upload file" });
  }
}
