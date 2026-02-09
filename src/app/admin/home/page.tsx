"use client";

import { useAdminData } from "../_hooks/useAdminData";
import AdminFormField from "../_components/AdminFormField";
import AdminCard from "../_components/AdminCard";
import AdminAlert from "../_components/AdminAlert";

interface HomeData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  welcome: {
    title: string;
    description: string;
  };
  sections: {
    aircrafts: { title: string };
    crew: { title: string; tabs: string[] };
  };
}

export default function HomePage() {
  const { data, loading, saving, error, success, setData, save, clearMessages } =
    useAdminData<HomeData>({ endpoint: "/api/admin/data/home" });

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

      <AdminCard title="Hero Section" description="The main banner at the top of the home page">
        <div className="space-y-4">
          <AdminFormField
            label="Title"
            name="hero.title"
            value={data.hero.title}
            onChange={updateField}
          />
          <AdminFormField
            label="Subtitle"
            name="hero.subtitle"
            value={data.hero.subtitle}
            onChange={updateField}
          />
          <AdminFormField
            label="CTA Button Text"
            name="hero.cta"
            value={data.hero.cta}
            onChange={updateField}
          />
        </div>
      </AdminCard>

      <AdminCard title="Welcome Section">
        <div className="space-y-4">
          <AdminFormField
            label="Title"
            name="welcome.title"
            type="textarea"
            rows={2}
            value={data.welcome.title}
            onChange={updateField}
            helpText="Use \n for line breaks"
          />
          <AdminFormField
            label="Description"
            name="welcome.description"
            type="textarea"
            rows={6}
            value={data.welcome.description}
            onChange={updateField}
          />
        </div>
      </AdminCard>

      <AdminCard title="Section Titles">
        <div className="space-y-4">
          <AdminFormField
            label="Aircrafts Section Title"
            name="sections.aircrafts.title"
            value={data.sections.aircrafts.title}
            onChange={updateField}
          />
          <AdminFormField
            label="Crew Section Title"
            name="sections.crew.title"
            value={data.sections.crew.title}
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
