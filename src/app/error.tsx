"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
      <p className="text-gray-500 max-w-sm">
        We&apos;re having trouble loading this page. Please try again in a moment.
      </p>
      <button
        onClick={reset}
        className="rounded-xl bg-[#0A1628] px-6 py-3 text-sm font-semibold text-white hover:bg-[#132238]"
      >
        Try again
      </button>
    </div>
  );
}
