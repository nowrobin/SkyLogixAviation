"use client";

import { useState, useEffect, useCallback } from "react";

interface UseAdminDataOptions<T> {
  endpoint: string;
  initialData?: T;
}

interface UseAdminDataReturn<T> {
  data: T | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  success: string | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  save: (payload?: T) => Promise<boolean>;
  reload: () => Promise<void>;
  clearMessages: () => void;
}

export function useAdminData<T>({
  endpoint,
}: UseAdminDataOptions<T>): UseAdminDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    clearMessages();
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to load data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [endpoint, clearMessages]);

  useEffect(() => {
    load();
  }, [load]);

  const save = useCallback(
    async (payload?: T): Promise<boolean> => {
      setSaving(true);
      clearMessages();
      try {
        const res = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload ?? data),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Failed to save");
        }
        setSuccess("Saved successfully!");
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [endpoint, data, clearMessages]
  );

  return {
    data,
    loading,
    saving,
    error,
    success,
    setData,
    save,
    reload: load,
    clearMessages,
  };
}
