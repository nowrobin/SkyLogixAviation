interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function AdminCard({
  children,
  title,
  description,
  className = "",
}: AdminCardProps) {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white shadow-sm ${className}`}>
      {(title || description) && (
        <div className="border-b border-gray-100 px-6 py-4">
          {title && (
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          )}
          {description && (
            <p className="mt-0.5 text-xs text-gray-400">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
