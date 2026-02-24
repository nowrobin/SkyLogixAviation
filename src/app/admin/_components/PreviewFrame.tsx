"use client";

interface PreviewFrameProps {
  children: React.ReactNode;
}

export default function PreviewFrame({ children }: PreviewFrameProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex flex-1 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1">
          <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-gray-400">skylogixaviation.com</span>
        </div>
        <span className="text-xs font-medium text-amber-600 bg-amber-50 rounded px-2 py-0.5">
          Preview
        </span>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "72vh" }}>
        {children}
      </div>
    </div>
  );
}
