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
    <div className={`rounded-xl border border-gray-200 bg-white p-6 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
