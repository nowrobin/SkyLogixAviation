"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminFormField from "../../_components/AdminFormField";
import AdminCard from "../../_components/AdminCard";
import AdminAlert from "../../_components/AdminAlert";
import AdminImageUpload from "../../_components/AdminImageUpload";
import AdminPreviewToggle from "../../_components/AdminPreviewToggle";
import PreviewFrame from "../../_components/PreviewFrame";
import FleetPreview from "../../_components/previews/FleetPreview";

interface Aircraft {
  id: string;
  name: string;
  year: number;
  model: string;
  engine: string;
  horsepower: number;
  flightRule: string;
  pricePerHour: string;
  description: string;
  images: string[];
}

const defaultData: Aircraft = {
  id: "",
  name: "",
  year: new Date().getFullYear(),
  model: "",
  engine: "",
  horsepower: 0,
  flightRule: "VFR",
  pricePerHour: "",
  description: "",
  images: [],
};

export default function FleetNewPage() {
  const router = useRouter();
  const [data, setData] = useState<Aircraft>(defaultData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  function updateField(name: string, value: string | number) {
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function updateImage(index: number, path: string) {
    setData((prev) => {
      const images = [...prev.images];
      images[index] = path;
      return { ...prev, images };
    });
  }

  function addImage() {
    setData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  }

  function removeImage(index: number) {
    setData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  }

  async function handleCreate() {
    if (!data.id.trim()) {
      setError("Registration number (ID) is required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/data/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push(`/admin/fleet/${encodeURIComponent(data.id.trim())}/edit`);
      } else {
        const body = await res.json().catch(() => ({}));
        setError(body.error || `Failed to create (${res.status})`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/admin/fleet" className="hover:text-gray-700">
            Fleet
          </Link>
          <span>/</span>
          <span className="text-gray-900">New Aircraft</span>
        </div>
        <AdminPreviewToggle mode={mode} onChange={setMode} />
      </div>

      {error && (
        <AdminAlert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {mode === "preview" ? (
        <PreviewFrame>
          <FleetPreview data={data} />
        </PreviewFrame>
      ) : (
        <>
          <AdminCard title="Basic Info">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <AdminFormField label="ID (Registration)" name="id" value={data.id} onChange={updateField} />
                <AdminFormField label="Name" name="name" value={data.name} onChange={updateField} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <AdminFormField label="Year" name="year" type="number" value={data.year} onChange={updateField} />
                <AdminFormField label="Model" name="model" value={data.model} onChange={updateField} />
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Specifications">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <AdminFormField label="Engine" name="engine" value={data.engine} onChange={updateField} />
                <AdminFormField label="Horsepower" name="horsepower" type="number" value={data.horsepower} onChange={updateField} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <AdminFormField label="Flight Rule" name="flightRule" value={data.flightRule} onChange={updateField} />
                <AdminFormField label="Price Per Hour" name="pricePerHour" value={data.pricePerHour} onChange={updateField} />
              </div>
              <AdminFormField label="Description" name="description" type="textarea" rows={3} value={data.description} onChange={updateField} />
            </div>
          </AdminCard>

          <AdminCard title="Images">
            <div className="space-y-4">
              {data.images.map((img, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex-1">
                    <AdminImageUpload
                      label={`Image ${index + 1}`}
                      value={img}
                      onChange={(path) => updateImage(index, path)}
                      directory={data.id || "new"}
                    />
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    className="mt-6 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-gray-300 text-gray-400 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={addImage}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-navy-900 transition-colors hover:bg-gray-100"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Image
              </button>
            </div>
          </AdminCard>
        </>
      )}

      <div className="flex justify-end gap-3">
        <Link
          href="/admin/fleet"
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          onClick={handleCreate}
          disabled={saving}
          className="rounded-lg bg-navy-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create Aircraft"}
        </button>
      </div>
    </div>
  );
}
