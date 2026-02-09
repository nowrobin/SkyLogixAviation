"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminData } from "../_hooks/useAdminData";
import AdminCard from "../_components/AdminCard";
import AdminAlert from "../_components/AdminAlert";

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

export default function FleetPage() {
  const { data, loading, error, success, reload, clearMessages } =
    useAdminData<Aircraft[]>({ endpoint: "/api/admin/data/fleet" });
  const [showAdd, setShowAdd] = useState(false);
  const [newId, setNewId] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-navy-900" />
      </div>
    );
  }

  if (!data) return null;

  async function handleAdd() {
    if (!newId.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/admin/data/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newId.trim(),
          name: newId.trim(),
          year: new Date().getFullYear(),
          model: "",
          engine: "",
          horsepower: 0,
          flightRule: "VFR",
          pricePerHour: "",
          description: "",
          images: [],
        }),
      });
      if (res.ok) {
        setShowAdd(false);
        setNewId("");
        reload();
      }
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(`Delete aircraft ${id}?`)) return;
    setDeleteError(null);
    try {
      const res = await fetch(`/api/admin/data/fleet/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        reload();
      } else {
        setDeleteError("Failed to delete");
      }
    } catch {
      setDeleteError("Failed to delete");
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {(error || success || deleteError) && (
        <AdminAlert
          type={error || deleteError ? "error" : "success"}
          message={error || deleteError || success || ""}
          onClose={clearMessages}
        />
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {data.length} Aircraft
        </h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Aircraft
        </button>
      </div>

      {showAdd && (
        <AdminCard>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Registration Number (ID)
              </label>
              <input
                type="text"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                placeholder="e.g. N12345"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-navy-900 focus:outline-none focus:ring-1 focus:ring-navy-900"
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={adding || !newId.trim()}
              className="rounded-lg bg-navy-900 px-6 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </AdminCard>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((aircraft) => (
          <AdminCard key={aircraft.id}>
            <div className="flex items-start gap-4">
              {aircraft.images[0] ? (
                <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={aircraft.images[0]}
                    alt={aircraft.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-20 w-28 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <span className="text-2xl text-gray-300">✈</span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{aircraft.name}</h3>
                <p className="text-sm text-gray-500">
                  {aircraft.year} {aircraft.model}
                </p>
                <p className="text-sm text-gray-500">{aircraft.pricePerHour}</p>
                <div className="mt-2 flex gap-2">
                  <Link
                    href={`/admin/fleet/${aircraft.id}`}
                    className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(aircraft.id)}
                    className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
