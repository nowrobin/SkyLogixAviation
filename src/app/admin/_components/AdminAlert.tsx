"use client";

import { useEffect } from "react";

interface AdminAlertProps {
  type: "success" | "error";
  message: string;
  onClose?: () => void;
  autoClose?: number;
}

export default function AdminAlert({
  type,
  message,
  onClose,
  autoClose = 3000,
}: AdminAlertProps) {
  useEffect(() => {
    if (onClose && autoClose > 0) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [onClose, autoClose]);

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm shadow-sm ${
        type === "success"
          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
          : "bg-red-50 text-red-600 border border-red-100"
      }`}
    >
      <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
        type === "success" ? "bg-emerald-100" : "bg-red-100"
      }`}>
        {type === "success" ? (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <span className="flex-1 font-medium">{message}</span>
      {onClose && (
        <button onClick={onClose} className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
