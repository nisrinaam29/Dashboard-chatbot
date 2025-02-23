import React from "react";

type ButtonType = {
  text: string;
  color: string;
  outline: boolean;
  active: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  additionalClass?: string;
  disabled?: boolean;
};
const Button: React.FC<ButtonType> = ({
  text,
  color,
  outline = false,
  active,
  onClick,
  type = "button",
  loading = false,
  additionalClass,
  disabled,
}) => {
  return (
    <button
      className={`btn btn-block ${active ? "btn-active" : ""} ${color} ${
        outline ? "btn-outline" : ""
      } ${additionalClass}`}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Button;
