"use client";

import Image from "next/image";

interface FleetPreviewProps {
  data: {
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
  };
}

export default function FleetPreview({ data }: FleetPreviewProps) {
  const mainImage = data.images.find((img) => img.trim() !== "");

  return (
    <div className="bg-gray-50 p-8 font-sans">
      <p className="mb-4 text-center text-xs uppercase tracking-wide text-gray-400">
        Fleet card — as seen on the website
      </p>

      <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={data.name || "Aircraft"}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <svg className="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {data.images.length > 1 && (
            <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
              +{data.images.filter((i) => i).length} photos
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-xl font-bold" style={{ color: "#0A1628" }}>
            {data.name || <span className="text-gray-300">Aircraft Name</span>}
          </h3>
          <p className="mt-0.5 text-sm text-gray-500">
            {[data.year, data.model].filter(Boolean).join(" ") || <span className="text-gray-300">Year Model</span>}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {(data.engine || data.horsepower) && (
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: "#E8F1FA", color: "#2E5E8E" }}
              >
                {[data.engine, data.horsepower && `${data.horsepower}HP`].filter(Boolean).join(" ")}
              </span>
            )}
            {data.flightRule && (
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: "#E8F1FA", color: "#2E5E8E" }}
              >
                {data.flightRule}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-base font-bold" style={{ color: "#D49A2A" }}>
              {data.pricePerHour || <span className="text-gray-300 font-normal text-sm">Price/hr</span>}
            </span>
            <span className="text-sm font-medium" style={{ color: "#2E5E8E" }}>
              Details →
            </span>
          </div>

          {data.description && (
            <p className="mt-3 border-t border-gray-100 pt-3 text-xs leading-relaxed text-gray-500">
              {data.description}
            </p>
          )}
        </div>
      </div>

      {/* Fleet page context */}
      <p className="mt-6 text-center text-xs text-gray-400">
        This card appears in the fleet grid at{" "}
        <span className="font-medium text-gray-600">/fleet</span>
      </p>
    </div>
  );
}
