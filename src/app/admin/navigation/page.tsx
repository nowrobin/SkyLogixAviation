"use client";

import { useAdminData } from "../_hooks/useAdminData";
import AdminFormField from "../_components/AdminFormField";
import AdminCard from "../_components/AdminCard";
import AdminAlert from "../_components/AdminAlert";

interface NavItem {
  label: string;
  href: string;
  scrollTo?: string;
}

interface NavigationData {
  navItems: NavItem[];
  navCta: {
    label: string;
    href: string;
  };
}

export default function NavigationPage() {
  const { data, loading, saving, error, success, setData, save, clearMessages } =
    useAdminData<NavigationData>({ endpoint: "/api/admin/data/navigation" });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-navy-900" />
      </div>
    );
  }

  if (!data) return null;

  function updateNavItem(index: number, field: string, value: string) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      (clone.navItems[index] as Record<string, unknown>)[field] = value || undefined;
      // Remove scrollTo if empty
      if (field === "scrollTo" && !value) {
        delete clone.navItems[index].scrollTo;
      }
      return clone;
    });
  }

  function addNavItem() {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.navItems.push({ label: "New Item", href: "/" });
      return clone;
    });
  }

  function removeNavItem(index: number) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.navItems.splice(index, 1);
      return clone;
    });
  }

  function updateCta(field: string, value: string) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      (clone.navCta as Record<string, unknown>)[field] = value;
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

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Nav Items</h2>
        <button
          onClick={addNavItem}
          className="flex items-center gap-1 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Item
        </button>
      </div>

      {data.navItems.map((item, index) => (
        <AdminCard key={index}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Item {index + 1}</span>
            <button
              onClick={() => removeNavItem(index)}
              className="rounded-lg px-3 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AdminFormField label="Label" name="label" value={item.label} onChange={(_, v) => updateNavItem(index, "label", String(v))} />
            <AdminFormField label="Href" name="href" value={item.href} onChange={(_, v) => updateNavItem(index, "href", String(v))} />
            <AdminFormField label="Scroll To" name="scrollTo" value={item.scrollTo || ""} onChange={(_, v) => updateNavItem(index, "scrollTo", String(v))} helpText="Optional section ID" />
          </div>
        </AdminCard>
      ))}

      <AdminCard title="CTA Button">
        <div className="grid grid-cols-2 gap-4">
          <AdminFormField label="Label" name="label" value={data.navCta.label} onChange={(_, v) => updateCta("label", String(v))} />
          <AdminFormField label="Href" name="href" value={data.navCta.href} onChange={(_, v) => updateCta("href", String(v))} />
        </div>
      </AdminCard>

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
