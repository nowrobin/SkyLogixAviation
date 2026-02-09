"use client";

import { useAdminData } from "../_hooks/useAdminData";
import AdminFormField from "../_components/AdminFormField";
import AdminCard from "../_components/AdminCard";
import AdminAlert from "../_components/AdminAlert";

interface PageMeta {
  title: string;
  description: string;
}

interface MetadataData {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  pages: Record<string, PageMeta>;
}

export default function MetadataPage() {
  const { data, loading, saving, error, success, setData, save, clearMessages } =
    useAdminData<MetadataData>({ endpoint: "/api/admin/data/metadata" });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-navy-900" />
      </div>
    );
  }

  if (!data) return null;

  function updateField(name: string, value: string | number) {
    setData((prev) => {
      if (!prev) return prev;
      const keys = name.split(".");
      const clone = JSON.parse(JSON.stringify(prev));
      let obj = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return clone;
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {(error || success) && (
        <AdminAlert
          type={error ? "error" : "success"}
          message={error || success || ""}
          onClose={clearMessages}
        />
      )}

      <AdminCard title="Global Defaults">
        <div className="space-y-4">
          <AdminFormField label="Site Name" name="siteName" value={data.siteName} onChange={updateField} />
          <AdminFormField label="Default Title" name="defaultTitle" value={data.defaultTitle} onChange={updateField} />
          <AdminFormField label="Default Description" name="defaultDescription" type="textarea" rows={2} value={data.defaultDescription} onChange={updateField} />
        </div>
      </AdminCard>

      {Object.entries(data.pages).map(([key, page]) => (
        <AdminCard key={key} title={`${key.charAt(0).toUpperCase() + key.slice(1)} Page`}>
          <div className="space-y-4">
            <AdminFormField
              label="Title"
              name={`pages.${key}.title`}
              value={page.title}
              onChange={updateField}
            />
            <AdminFormField
              label="Description"
              name={`pages.${key}.description`}
              type="textarea"
              rows={2}
              value={page.description}
              onChange={updateField}
            />
          </div>
        </AdminCard>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => save()}
          disabled={saving}
          className="rounded-lg bg-navy-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
