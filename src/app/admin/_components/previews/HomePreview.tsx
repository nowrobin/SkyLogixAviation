"use client";

interface HomePreviewProps {
  data: {
    hero: { title: string; subtitle: string; cta: string };
    welcome: { title: string; description: string };
    sections: {
      aircrafts: { title: string };
      crew: { title: string };
    };
  };
}

export default function HomePreview({ data }: HomePreviewProps) {
  return (
    <div className="font-sans text-sm">
      {/* ── Hero ── */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: "260px",
          backgroundImage: "url('/landing_Image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,22,40,0.55)" }} />
        <div className="relative z-10 px-6 text-center text-white">
          <h1 className="mb-2 text-2xl font-bold leading-tight">
            {data.hero.title || <span className="opacity-40">Hero Title</span>}
          </h1>
          <p className="mb-4 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
            {data.hero.subtitle || <span className="opacity-40">Subtitle text</span>}
          </p>
          <div className="inline-flex items-center gap-3">
            <span
              className="inline-block rounded-lg px-5 py-2 text-xs font-semibold"
              style={{ backgroundColor: "#FFBD59", color: "#0A1628" }}
            >
              {data.hero.cta || "CTA Button"}
            </span>
            <span
              className="inline-block rounded-lg border px-5 py-2 text-xs font-semibold text-white"
              style={{ borderColor: "rgba(255,255,255,0.6)" }}
            >
              Become A Pilot
            </span>
          </div>
        </div>
      </div>

      {/* ── Welcome ── */}
      <div className="bg-white px-8 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="grid grid-cols-2 gap-8 items-start">
            <h2
              className="text-xl font-bold leading-snug"
              style={{ color: "#FFBD59" }}
            >
              {data.welcome.title
                ? data.welcome.title.split("\\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < data.welcome.title.split("\\n").length - 1 && <br />}
                    </span>
                  ))
                : <span className="opacity-30">Welcome Title</span>
              }
            </h2>
            <p className="text-gray-600 text-xs leading-relaxed">
              {data.welcome.description || <span className="opacity-30">Description text...</span>}
            </p>
          </div>
        </div>
      </div>

      {/* ── Why Us (static) ── */}
      <div className="px-8 py-8" style={{ backgroundColor: "#0A1628" }}>
        <p className="text-center text-xs font-medium mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
          Why Skylogix? — (static section)
        </p>
        <div className="grid grid-cols-3 gap-4">
          {["Expert Instructors", "Affordable Rates", "Well-Maintained Fleet"].map((title) => (
            <div
              key={title}
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: "#132238" }}
            >
              <p className="text-xs font-medium text-white">{title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fleet Section Title ── */}
      <div className="bg-gray-50 px-8 py-8 border-t border-gray-100">
        <div className="mb-2 text-center">
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Our Fleet Section</p>
          <h3 className="text-base font-bold" style={{ color: "#0A1628" }}>
            {data.sections.aircrafts.title || <span className="text-gray-300">Section Title</span>}
          </h3>
        </div>
        {/* Placeholder cards */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="h-16 bg-gray-100" />
              <div className="p-2">
                <div className="h-2 w-16 rounded bg-gray-200 mb-1" />
                <div className="h-2 w-10 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Crew Section Title ── */}
      <div className="bg-white px-8 py-8 border-t border-gray-100">
        <div className="mb-2 text-center">
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Crew Section</p>
          <h3 className="text-base font-bold" style={{ color: "#0A1628" }}>
            {data.sections.crew.title || <span className="text-gray-300">Section Title</span>}
          </h3>
        </div>
        {/* Placeholder crew cards */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="rounded-xl bg-gray-100 mb-2" style={{ aspectRatio: "3/4" }} />
              <div className="h-2 w-12 rounded bg-gray-200 mx-auto mb-1" />
              <div className="h-2 w-8 rounded bg-gray-100 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
