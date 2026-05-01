"use client";

import { useAdminData } from "../_hooks/useAdminData";
import AdminFormField from "../_components/AdminFormField";
import AdminCard from "../_components/AdminCard";
import AdminAlert from "../_components/AdminAlert";

interface ContactField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

interface ContactData {
  contactPage: {
    intro: string;
  };
  contactForm: {
    fields: ContactField[];
    submitButton: {
      default: string;
      sending: string;
      success: string;
      alreadySent: string;
    };
    alerts: {
      success: string;
      error: string;
    };
  };
}

export default function ContactPage() {
  const { data, loading, saving, error, success, setData, save, clearMessages } =
    useAdminData<ContactData>({ endpoint: "/api/admin/data/contact" });

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

  function updateFormField(index: number, field: string, value: string | boolean) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      (clone.contactForm.fields[index] as Record<string, unknown>)[field] = value;
      return clone;
    });
  }

  function addFormField() {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.contactForm.fields.push({
        name: "newField",
        label: "New Field",
        type: "text",
        placeholder: "",
        required: false,
      });
      return clone;
    });
  }

  function removeFormField(index: number) {
    setData((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.contactForm.fields.splice(index, 1);
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

      <AdminCard title="Page Content">
        <AdminFormField
          label="Introduction Text"
          name="contactPage.intro"
          type="textarea"
          rows={3}
          value={data.contactPage.intro}
          onChange={updateField}
        />
      </AdminCard>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Form Fields</h2>
        <button
          onClick={addFormField}
          className="flex items-center gap-1 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Field
        </button>
      </div>

      {data.contactForm.fields.map((field, index) => (
        <AdminCard key={index}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Field: {field.label}</span>
            <button
              onClick={() => removeFormField(index)}
              className="rounded-lg px-3 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <AdminFormField label="Name" name="name" value={field.name} onChange={(_, v) => updateFormField(index, "name", String(v))} />
            <AdminFormField label="Label" name="label" value={field.label} onChange={(_, v) => updateFormField(index, "label", String(v))} />
            <AdminFormField label="Type" name="type" value={field.type} onChange={(_, v) => updateFormField(index, "type", String(v))} helpText="text, email, textarea" />
            <AdminFormField label="Placeholder" name="placeholder" value={field.placeholder} onChange={(_, v) => updateFormField(index, "placeholder", String(v))} />
          </div>
          <div className="mt-3">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => updateFormField(index, "required", e.target.checked)}
                className="rounded border-gray-300"
              />
              Required
            </label>
          </div>
        </AdminCard>
      ))}

      <AdminCard title="Button Labels">
        <div className="grid grid-cols-2 gap-4">
          <AdminFormField label="Default" name="contactForm.submitButton.default" value={data.contactForm.submitButton.default} onChange={updateField} />
          <AdminFormField label="Sending" name="contactForm.submitButton.sending" value={data.contactForm.submitButton.sending} onChange={updateField} />
          <AdminFormField label="Success" name="contactForm.submitButton.success" value={data.contactForm.submitButton.success} onChange={updateField} />
          <AdminFormField label="Already Sent" name="contactForm.submitButton.alreadySent" value={data.contactForm.submitButton.alreadySent} onChange={updateField} />
        </div>
      </AdminCard>

      <AdminCard title="Alert Messages">
        <div className="space-y-4">
          <AdminFormField label="Success Message" name="contactForm.alerts.success" value={data.contactForm.alerts.success} onChange={updateField} />
          <AdminFormField label="Error Message" name="contactForm.alerts.error" value={data.contactForm.alerts.error} onChange={updateField} />
        </div>
      </AdminCard>

      <div className="flex justify-end">
        <button
          onClick={() => save()}
          disabled={saving}
          className="rounded-lg bg-navy-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
