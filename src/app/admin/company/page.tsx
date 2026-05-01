"use client";

import { useAdminData } from "../_hooks/useAdminData";
import AdminFormField from "../_components/AdminFormField";
import AdminCard from "../_components/AdminCard";
import AdminAlert from "../_components/AdminAlert";

interface CompanyData {
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    full: string;
    airport: string;
  };
  phone: string;
  email: string;
  hours: string;
  rates: {
    aircraft: string;
    instruction: string;
  };
}

export default function CompanyPage() {
  const { data, loading, saving, error, success, setData, save, clearMessages } =
    useAdminData<CompanyData>({ endpoint: "/api/admin/data/company" });

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

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {(error || success) && (
        <AdminAlert
          type={error ? "error" : "success"}
          message={error || success || ""}
          onClose={clearMessages}
        />
      )}

      <AdminCard title="Basic Info">
        <div className="space-y-4">
          <AdminFormField
            label="Company Name"
            name="name"
            value={data.name}
            onChange={updateField}
          />
          <div className="grid grid-cols-2 gap-4">
            <AdminFormField
              label="Phone"
              name="phone"
              value={data.phone}
              onChange={updateField}
            />
            <AdminFormField
              label="Email"
              name="email"
              type="email"
              value={data.email}
              onChange={updateField}
            />
          </div>
          <AdminFormField
            label="Business Hours"
            name="hours"
            value={data.hours}
            onChange={updateField}
          />
        </div>
      </AdminCard>

      <AdminCard title="Location">
        <div className="space-y-4">
          <AdminFormField
            label="Address"
            name="location.address"
            value={data.location.address}
            onChange={updateField}
          />
          <div className="grid grid-cols-3 gap-4">
            <AdminFormField
              label="City"
              name="location.city"
              value={data.location.city}
              onChange={updateField}
            />
            <AdminFormField
              label="State"
              name="location.state"
              value={data.location.state}
              onChange={updateField}
            />
            <AdminFormField
              label="ZIP"
              name="location.zip"
              value={data.location.zip}
              onChange={updateField}
            />
          </div>
          <AdminFormField
            label="Full Address"
            name="location.full"
            value={data.location.full}
            onChange={updateField}
          />
          <AdminFormField
            label="Airport"
            name="location.airport"
            value={data.location.airport}
            onChange={updateField}
          />
        </div>
      </AdminCard>

      <AdminCard title="Rates">
        <div className="grid grid-cols-2 gap-4">
          <AdminFormField
            label="Aircraft Rate"
            name="rates.aircraft"
            value={data.rates.aircraft}
            onChange={updateField}
          />
          <AdminFormField
            label="Instruction Rate"
            name="rates.instruction"
            value={data.rates.instruction}
            onChange={updateField}
          />
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
