"use client";

interface TrainingStep {
  id: string;
  order: number;
  title: string;
  abbreviation: string;
  icon: string;
  description: string;
  accentColor: string;
  accentBg: string;
  accentText: string;
  requirements: string[];
  learns: string[];
  learnsLabel: string;
}

interface TrainingData {
  intro: string;
  cta: {
    title: string;
    icon: string;
    description: string;
    location: string;
  };
  steps: TrainingStep[];
}

interface TrainingPreviewProps {
  data: TrainingData;
}

export default function TrainingPreview({ data }: TrainingPreviewProps) {
  return (
    <div className="bg-white px-8 py-8 font-sans">
      <p className="mb-6 text-center text-xs uppercase tracking-wide text-gray-400">
        Training page — as seen on the website
      </p>

      {/* Intro */}
      {data.intro && (
        <div className="mb-8 rounded-xl bg-gray-50 p-5">
          <p className="text-sm leading-relaxed text-gray-600">{data.intro}</p>
        </div>
      )}

      {/* Training path steps */}
      {data.steps.length > 0 && (
        <div className="mb-8">
          <p className="mb-4 text-xs uppercase tracking-wide text-gray-400">Training Steps</p>

          {/* Path visualizer */}
          <div className="mb-6 flex items-center justify-center gap-0">
            {data.steps.map((step, i) => (
              <div key={step.id || i} className="flex items-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{
                    backgroundColor: i === data.steps.length - 1 ? "#FFBD59" : "#0A1628",
                    color: i === data.steps.length - 1 ? "#0A1628" : "white",
                  }}
                  title={step.title}
                >
                  {step.abbreviation || step.icon || String(i + 1)}
                </div>
                {i < data.steps.length - 1 && (
                  <div className="h-0.5 w-6 bg-gray-200" />
                )}
              </div>
            ))}
          </div>

          {/* Step cards */}
          <div className="space-y-4">
            {data.steps.map((step, index) => (
              <div
                key={step.id || index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="flex items-center gap-3 p-4">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg"
                    style={{ backgroundColor: "#E8F1FA" }}
                  >
                    {step.icon || "📋"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {step.abbreviation}
                      </span>
                      <h4 className="text-sm font-semibold" style={{ color: "#0A1628" }}>
                        {step.title || "Step Title"}
                      </h4>
                    </div>
                    {step.description && (
                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>

                {(step.requirements.length > 0 || step.learns.length > 0) && (
                  <div className="grid grid-cols-2 gap-0 border-t border-gray-100">
                    {step.requirements.length > 0 && (
                      <div className="p-3">
                        <p className="mb-1.5 text-xs font-medium text-gray-400">Requirements</p>
                        <ul className="space-y-0.5">
                          {step.requirements.slice(0, 3).map((req, i) => (
                            <li key={i} className="flex items-start gap-1 text-xs text-gray-600">
                              <span className="mt-0.5 text-gray-400">•</span>
                              {req}
                            </li>
                          ))}
                          {step.requirements.length > 3 && (
                            <li className="text-xs text-gray-400">+{step.requirements.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                    {step.learns.length > 0 && (
                      <div className="border-l border-gray-100 p-3">
                        <p className="mb-1.5 text-xs font-medium text-gray-400">
                          {step.learnsLabel || "You'll Learn"}
                        </p>
                        <ul className="space-y-0.5">
                          {step.learns.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-1 text-xs text-gray-600">
                              <span className="mt-0.5" style={{ color: "#D49A2A" }}>✓</span>
                              {item}
                            </li>
                          ))}
                          {step.learns.length > 3 && (
                            <li className="text-xs text-gray-400">+{step.learns.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      {(data.cta.title || data.cta.description) && (
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: "#0A1628" }}
        >
          <div className="flex items-start gap-4">
            {data.cta.icon && (
              <span className="text-3xl">{data.cta.icon}</span>
            )}
            <div>
              <h3 className="text-sm font-bold text-white">
                {data.cta.title || "CTA Title"}
              </h3>
              {data.cta.description && (
                <p className="mt-1 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {data.cta.description}
                </p>
              )}
              {data.cta.location && (
                <p className="mt-2 text-xs" style={{ color: "#FFBD59" }}>
                  📍 {data.cta.location}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
