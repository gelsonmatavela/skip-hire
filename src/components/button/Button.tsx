import { ButtonHTMLAttributes } from "react";
import { cn } from "../../../lib/utils"; // Certifique-se de ter essa função para classes dinâmicas

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "selected";
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
        variant === "default" ? "bg-blue-600 hover:bg-blue-500 text-white" : "",
        variant === "outline" ? "border border-zinc-700 text-white" : "",
        variant === "selected" ? "bg-green-600 hover:bg-green-500 text-white" : "",
        className
      )}
    />
  );
};
