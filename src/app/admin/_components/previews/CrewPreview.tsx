"use client";

import Image from "next/image";

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

interface CrewPreviewProps {
  category: CrewCategory;
  members: CrewMember[];
}

export default function CrewPreview({ category, members }: CrewPreviewProps) {
  return (
    <div className="bg-gray-50 px-8 py-10 font-sans">
      <p className="mb-6 text-center text-xs uppercase tracking-wide text-gray-400">
        Crew section — as seen on the website
      </p>

      {/* Category heading */}
      <h3 className="mb-5 text-base font-semibold" style={{ color: "#0A1628" }}>
        {category.label || "Category"}
      </h3>

      {members.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
          <p className="text-sm text-gray-400">No members in this category yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {members.map((member) => (
            <div key={member.id} className="text-center">
              {/* Portrait image 3:4 ratio */}
              <div
                className="relative mx-auto mb-3 w-full overflow-hidden rounded-2xl shadow-md"
                style={{ aspectRatio: "3/4", maxWidth: "120px" }}
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="font-semibold text-sm" style={{ color: "#0A1628" }}>
                {member.name || <span className="text-gray-300">Name</span>}
              </p>
              <p className="text-xs text-gray-500">
                {member.role || <span className="text-gray-300">Role</span>}
              </p>
              {member.certifications && member.certifications.length > 0 && (
                <div className="mt-1.5 flex flex-wrap justify-center gap-1">
                  {member.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="rounded-full px-1.5 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: "#E8F1FA", color: "#2E5E8E" }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {members.some((m) => m.bio) && (
        <div className="mt-8 space-y-4">
          <p className="text-xs uppercase tracking-wide text-gray-400">Bios</p>
          {members
            .filter((m) => m.bio)
            .map((member) => (
              <div
                key={member.id}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <p className="mb-1 text-xs font-semibold" style={{ color: "#0A1628" }}>
                  {member.name}
                </p>
                <p className="text-xs leading-relaxed text-gray-500">{member.bio}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
