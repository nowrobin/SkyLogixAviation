interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg md:text-xl max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-navy-200" : "text-gray-500"}`}
        >
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-1 w-16 bg-gold-500 rounded-full mx-auto" />
    </div>
  );
}
