"use client";

import { useState } from "react";
import { useAdminData } from "../_hooks/useAdminData";
import AdminFormField from "../_components/AdminFormField";
import AdminCard from "../_components/AdminCard";
import AdminAlert from "../_components/AdminAlert";
import AdminArrayField from "../_components/AdminArrayField";
import AdminImageUpload from "../_components/AdminImageUpload";
import AdminPreviewToggle from "../_components/AdminPreviewToggle";
import PreviewFrame from "../_components/PreviewFrame";
import CrewPreview from "../_components/previews/CrewPreview";

interface CrewMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  certifications?: string[];
}

interface CrewCategory {
  key: string;
  label: string;
}

interface CrewData {
  categories: CrewCategory[];
  members: Record<string, CrewMember[]>;
}

export default function CrewPage() {
  const { data, loading, saving, error, success, setData, save, clearMessages } =
    useAdminData<CrewData>({ endpoint: "/api/admin/data/crew" });
  const [activeTab, setActiveTab] = useState(0);
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-navy-900" />
      </div>
    );
  }

  if (!data) return null;

  const currentCategory = data.categories[activeTab];
  const currentMembers = currentCategory
    ? data.members[currentCategory.key] || []
    : [];

  function updateMember(
    catKey: string,
    memberIndex: number,
    field: string,
    value: string
  ) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      (clone.members[catKey][memberIndex] as Record<string, unknown>)[field] =
        value;
      return clone;
    });
  }

  function updateMemberCerts(
    catKey: string,
    memberIndex: number,
    certs: string[]
  ) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.members[catKey][memberIndex].certifications = certs;
      return clone;
    });
  }

  function addMember(catKey: string) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      const count = clone.members[catKey].length + 1;
      clone.members[catKey].push({
        id: `${catKey}-${count}`,
        name: "TBD",
        role: "",
        image: "/coming_soon.png",
      });
      return clone;
    });
  }

  function removeMember(catKey: string, index: number) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.members[catKey].splice(index, 1);
      // Re-index IDs
      clone.members[catKey].forEach((m: CrewMember, i: number) => {
        m.id = `${catKey}-${i + 1}`;
      });
      return clone;
    });
  }

  function addCategory() {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      const key = `category-${clone.categories.length + 1}`;
      clone.categories.push({ key, label: "New Category" });
      clone.members[key] = [];
      return clone;
    });
  }

  function updateCategoryLabel(index: number, label: string) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.categories[index].label = label;
      return clone;
    });
  }

  function removeCategory(index: number) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      const catKey = clone.categories[index].key;
      clone.categories.splice(index, 1);
      delete clone.members[catKey];
      return clone;
    });
    if (activeTab >= (data?.categories.length ?? 1) - 1) {
      setActiveTab(Math.max(0, activeTab - 1));
    }
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

      {/* Category Tabs + Preview Toggle */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        {data.categories.map((cat, index) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(index)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === index
                ? "border-navy-900 text-navy-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat.label} ({(data.members[cat.key] || []).length})
          </button>
        ))}
        <button
          onClick={addCategory}
          className="ml-auto rounded-lg px-3 py-1.5 text-sm text-navy-900 hover:bg-gray-100"
        >
          + Category
        </button>
        <AdminPreviewToggle mode={mode} onChange={setMode} />
      </div>

      {mode === "preview" && currentCategory ? (
        <PreviewFrame>
          <CrewPreview category={currentCategory} members={currentMembers} />
        </PreviewFrame>
      ) : null}

      {/* Category Settings */}
      {mode === "edit" && currentCategory && (
        <AdminCard>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <AdminFormField
                label="Category Label"
                name="label"
                value={currentCategory.label}
                onChange={(_, v) => updateCategoryLabel(activeTab, String(v))}
              />
            </div>
            <button
              onClick={() => removeCategory(activeTab)}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Delete Category
            </button>
          </div>
        </AdminCard>
      )}

      {/* Members */}
      {mode === "edit" && currentCategory && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              Members ({currentMembers.length})
            </h3>
            <button
              onClick={() => addMember(currentCategory.key)}
              className="flex items-center gap-1 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Member
            </button>
          </div>

          {currentMembers.map((member, index) => (
            <AdminCard key={member.id}>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-500">
                  {member.name || "Unnamed"}
                </h4>
                <button
                  onClick={() => removeMember(currentCategory.key, index)}
                  className="rounded-lg px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <AdminFormField
                    label="Name"
                    name="name"
                    value={member.name}
                    onChange={(_, v) =>
                      updateMember(
                        currentCategory.key,
                        index,
                        "name",
                        String(v)
                      )
                    }
                  />
                  <AdminFormField
                    label="Role"
                    name="role"
                    value={member.role}
                    onChange={(_, v) =>
                      updateMember(
                        currentCategory.key,
                        index,
                        "role",
                        String(v)
                      )
                    }
                  />
                </div>
                <AdminImageUpload
                  label="Profile Image"
                  value={member.image}
                  onChange={(path) =>
                    updateMember(currentCategory.key, index, "image", path)
                  }
                  directory="crew"
                />
                <AdminFormField
                  label="Bio"
                  name="bio"
                  type="textarea"
                  rows={3}
                  value={member.bio || ""}
                  onChange={(_, v) =>
                    updateMember(
                      currentCategory.key,
                      index,
                      "bio",
                      String(v)
                    )
                  }
                />
                <AdminArrayField
                  label="Certifications"
                  items={member.certifications || []}
                  onChange={(certs) =>
                    updateMemberCerts(currentCategory.key, index, certs)
                  }
                  placeholder="e.g. CFI, CFII, ATP"
                />
              </div>
            </AdminCard>
          ))}
        </>
      )}

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
