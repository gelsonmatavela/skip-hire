import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary" }) => {
  const baseClasses = "px-6 py-2 rounded-lg transition-all duration-300 font-medium";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-zinc-500 text-white hover:bg-zinc-400";

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {label}
    </button>
  );
};

export default Button;
