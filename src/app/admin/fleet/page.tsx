"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAdminData } from "../_hooks/useAdminData";
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
  order: number;
}

export default function FleetPage() {
  const router = useRouter();
  const { data, loading, error, success, reload, clearMessages } =
    useAdminData<Aircraft[]>({ endpoint: "/api/admin/data/fleet" });
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [reorderSuccess, setReorderSuccess] = useState(false);

  // Drag state
  const dragIndex = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [localOrder, setLocalOrder] = useState<Aircraft[] | null>(null);

  const fleet = localOrder ?? data ?? [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-[#0A1628]" />
      </div>
    );
  }

  if (!data) return null;

  // ── Drag handlers ──────────────────────────────────────────────────────────

  function onDragStart(index: number) {
    dragIndex.current = index;
  }

  function onDragEnter(index: number) {
    if (dragIndex.current === null || dragIndex.current === index) return;
    setDragOver(index);
    const items = [...fleet];
    const [moved] = items.splice(dragIndex.current, 1);
    items.splice(index, 0, moved);
    dragIndex.current = index;
    setLocalOrder(items);
  }

  function onDragEnd() {
    setDragOver(null);
    dragIndex.current = null;
  }

  async function handleSaveOrder() {
    const ids = fleet.map((a) => a.id);
    setReordering(true);
    setReorderSuccess(false);
    try {
      const res = await fetch("/api/admin/data/fleet/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (res.ok) {
        setReorderSuccess(true);
        setLocalOrder(null);
        reload();
        setTimeout(() => setReorderSuccess(false), 3000);
      }
    } finally {
      setReordering(false);
    }
  }

  // ── Up / Down ──────────────────────────────────────────────────────────────

  function moveItem(index: number, direction: "up" | "down") {
    const items = [...fleet];
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= items.length) return;
    [items[index], items[swapWith]] = [items[swapWith], items[index]];
    setLocalOrder(items);
  }

  // ── Delete ─────────────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    if (!confirm(`Delete aircraft ${id}?`)) return;
    setDeleteError(null);
    try {
      const res = await fetch(`/api/admin/data/fleet/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setLocalOrder(null);
        reload();
      } else {
        const body = await res.json().catch(() => ({}));
        setDeleteError(body.error || `Failed to delete (${res.status})`);
      }
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  const isDirty = localOrder !== null;

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {(error || success || deleteError) && (
        <AdminAlert
          type={error || deleteError ? "error" : "success"}
          message={error || deleteError || success || ""}
          onClose={() => { clearMessages(); setDeleteError(null); }}
        />
      )}
      {reorderSuccess && (
        <AdminAlert type="success" message="Order saved." onClose={() => setReorderSuccess(false)} />
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-gray-900">
            {fleet.length} Aircraft
          </h2>
          {isDirty && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600 border border-amber-200">
              Unsaved order
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              onClick={handleSaveOrder}
              disabled={reordering}
              className="flex items-center gap-1.5 rounded-lg bg-[#0A1628] px-4 py-2 text-sm font-medium text-white hover:bg-[#132238] disabled:opacity-50"
            >
              {reordering ? (
                <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              Save Order
            </button>
          )}
          {isDirty && (
            <button
              onClick={() => setLocalOrder(null)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Reset
            </button>
          )}
          <button
            onClick={() => router.push("/admin/fleet/new")}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Aircraft
          </button>
        </div>
      </div>

      {/* Hint */}
      {fleet.length > 1 && (
        <p className="text-xs text-gray-400 flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          드래그하거나 ↑↓ 버튼으로 순서를 바꾼 뒤 Save Order를 눌러주세요.
        </p>
      )}

      {/* Fleet list */}
      <div className="space-y-2">
        {fleet.map((aircraft, index) => (
          <div
            key={aircraft.id}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragEnter={() => onDragEnter(index)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`flex items-center gap-4 rounded-xl border bg-white p-4 transition-all cursor-grab active:cursor-grabbing ${
              dragOver === index
                ? "border-[#0A1628] shadow-md scale-[1.01]"
                : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow"
            }`}
          >
            {/* Drag handle */}
            <div className="flex flex-col items-center gap-0.5 text-gray-300 select-none flex-shrink-0">
              <span className="text-[10px] font-bold text-gray-300">#{index + 1}</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 6a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM8 14a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM8 22a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>

            {/* Image */}
            {aircraft.images[0] ? (
              <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={aircraft.images[0]}
                  alt={aircraft.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <svg className="h-6 w-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{aircraft.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {aircraft.year} {aircraft.model}
              </p>
              {aircraft.pricePerHour && (
                <p className="text-xs text-gray-400 mt-0.5">{aircraft.pricePerHour}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Up/Down */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveItem(index, "up")}
                  disabled={index === 0}
                  className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-20 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveItem(index, "down")}
                  disabled={index === fleet.length - 1}
                  className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-20 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <Link
                href={`/admin/fleet/${encodeURIComponent(aircraft.id)}/edit`}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(aircraft.id)}
                className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
