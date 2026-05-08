"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface AdminImageUploadProps {
  value: string;
  onChange: (path: string) => void;
  directory?: string;
  filename?: string;
  label?: string;
  deferred?: boolean;
  onFileSelect?: (file: File) => void;
}

export default function AdminImageUpload({
  value = "",
  onChange,
  directory,
  filename,
  label = "Image",
  deferred = false,
  onFileSelect,
}: AdminImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (deferred && onFileSelect) {
      onFileSelect(file);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    if (directory) formData.append("directory", directory);
    if (filename) formData.append("filename", filename);

    try {
      const res = await fetch("/api/admin/upload/image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Upload failed");
      }

      const data = await res.json();
      onChange(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-start gap-4">
        {value && (
          <div className="relative h-24 w-24 flex-shrink-0">
            <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              title="Remove image"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-navy-800 file:cursor-pointer"
            disabled={uploading}
          />
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/path/to/image.jpg"
            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-navy-900 focus:outline-none focus:ring-1 focus:ring-navy-900"
          />
          {uploading && (
            <p className="mt-1 text-xs text-gray-500">Uploading...</p>
          )}
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
