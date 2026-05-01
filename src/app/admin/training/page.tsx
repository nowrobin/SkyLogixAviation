"use client";

import { useState } from "react";
import { useAdminData } from "../_hooks/useAdminData";
import AdminFormField from "../_components/AdminFormField";
import AdminCard from "../_components/AdminCard";
import AdminAlert from "../_components/AdminAlert";
import AdminArrayField from "../_components/AdminArrayField";
import AdminPreviewToggle from "../_components/AdminPreviewToggle";
import PreviewFrame from "../_components/PreviewFrame";
import TrainingPreview from "../_components/previews/TrainingPreview";

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

export default function TrainingPage() {
  const { data, loading, saving, error, success, setData, save, clearMessages } =
    useAdminData<TrainingData>({ endpoint: "/api/admin/data/training" });
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-navy-900" />
      </div>
    );
  }

  if (!data) return null;

  function updateField(name: string, value: string | number) {
    setData((prev) => {
      if (!prev) return prev;
      const keys = name.split(".");
      const clone = JSON.parse(JSON.stringify(prev));
      let obj = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return clone;
    });
  }

  function updateStep(index: number, field: string, value: string | number) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      (clone.steps[index] as Record<string, unknown>)[field] = value;
      return clone;
    });
  }

  function updateStepArray(index: number, field: "requirements" | "learns", items: string[]) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.steps[index][field] = items;
      return clone;
    });
  }

  function addStep() {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      const order = clone.steps.length + 1;
      clone.steps.push({
        id: `step-${order}`,
        order,
        title: "New Step",
        abbreviation: "NEW",
        icon: "📋",
        description: "",
        accentColor: "border-gray-500",
        accentBg: "bg-gray-50",
        accentText: "text-gray-600",
        requirements: [],
        learns: [],
        learnsLabel: "You'll Learn",
      });
      return clone;
    });
  }

  function removeStep(index: number) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.steps.splice(index, 1);
      clone.steps.forEach((s: TrainingStep, i: number) => {
        s.order = i + 1;
      });
      return clone;
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {(error || success) && (
        <AdminAlert
          type={error ? "error" : "success"}
          message={error || success || ""}
          onClose={clearMessages}
        />
      )}

      {/* Mode toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {mode === "preview" ? "Changes update the preview in real-time" : "Edit content below"}
        </p>
        <AdminPreviewToggle mode={mode} onChange={setMode} />
      </div>

      {mode === "preview" ? (
        <>
          <PreviewFrame>
            <TrainingPreview data={data} />
          </PreviewFrame>
          <div className="flex justify-end">
            <button
              onClick={() => save()}
              disabled={saving}
              className="rounded-lg bg-navy-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      ) : (
        <>
      <AdminCard title="Introduction">
        <AdminFormField
          label="Intro Text"
          name="intro"
          type="textarea"
          rows={3}
          value={data.intro}
          onChange={updateField}
        />
      </AdminCard>

      <AdminCard title="CTA Section">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <AdminFormField label="Title" name="cta.title" value={data.cta.title} onChange={updateField} />
            <AdminFormField label="Icon" name="cta.icon" value={data.cta.icon} onChange={updateField} />
          </div>
          <AdminFormField label="Description" name="cta.description" type="textarea" rows={2} value={data.cta.description} onChange={updateField} />
          <AdminFormField label="Location" name="cta.location" value={data.cta.location} onChange={updateField} />
        </div>
      </AdminCard>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Training Steps</h2>
        <button
          onClick={addStep}
          className="flex items-center gap-1 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Step
        </button>
      </div>

      {data.steps.map((step, index) => (
        <AdminCard key={step.id || index}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium text-gray-900">
              Step {index + 1}: {step.title}
            </h3>
            <button
              onClick={() => removeStep(index)}
              className="rounded-lg px-3 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <AdminFormField label="Title" name="title" value={step.title} onChange={(_, v) => updateStep(index, "title", v)} />
              <AdminFormField label="Abbreviation" name="abbreviation" value={step.abbreviation} onChange={(_, v) => updateStep(index, "abbreviation", v)} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <AdminFormField label="ID" name="id" value={step.id} onChange={(_, v) => updateStep(index, "id", v)} />
              <AdminFormField label="Icon" name="icon" value={step.icon} onChange={(_, v) => updateStep(index, "icon", v)} />
              <AdminFormField label="Learns Label" name="learnsLabel" value={step.learnsLabel} onChange={(_, v) => updateStep(index, "learnsLabel", v)} />
            </div>
            <AdminFormField label="Description" name="description" type="textarea" rows={2} value={step.description} onChange={(_, v) => updateStep(index, "description", v)} />
            <div className="grid grid-cols-3 gap-4">
              <AdminFormField label="Accent Color" name="accentColor" value={step.accentColor} onChange={(_, v) => updateStep(index, "accentColor", v)} helpText="e.g. border-blue-500" />
              <AdminFormField label="Accent Bg" name="accentBg" value={step.accentBg} onChange={(_, v) => updateStep(index, "accentBg", v)} helpText="e.g. bg-blue-50" />
              <AdminFormField label="Accent Text" name="accentText" value={step.accentText} onChange={(_, v) => updateStep(index, "accentText", v)} helpText="e.g. text-blue-600" />
            </div>
            <AdminArrayField label="Requirements" items={step.requirements} onChange={(items) => updateStepArray(index, "requirements", items)} placeholder="e.g. Age: 17+" />
            <AdminArrayField label="Learns / Benefits" items={step.learns} onChange={(items) => updateStepArray(index, "learns", items)} placeholder="e.g. Aircraft control" />
          </div>
        </AdminCard>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => save()}
          disabled={saving}
          className="rounded-lg bg-navy-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
        </>
      )}
    </div>
  );
}
