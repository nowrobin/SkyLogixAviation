import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-navy-900 font-semibold hover:bg-gold-600 active:bg-gold-600",
  secondary:
    "bg-navy-800 text-white font-semibold hover:bg-navy-700 active:bg-navy-700",
  ghost:
    "bg-transparent text-navy-900 hover:bg-navy-100 active:bg-navy-100",
  outline:
    "bg-transparent border-2 border-gold-500 text-gold-500 font-semibold hover:bg-gold-500 hover:text-navy-900",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-base rounded-xl",
  lg: "px-8 py-3 text-lg rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled,
  type = "button",
  className = "",
}: ButtonProps) {
  const styles = `inline-flex items-center justify-center transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}
