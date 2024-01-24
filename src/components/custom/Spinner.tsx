import React, { FC } from "react";

interface Spinner {
  size?: "sm" | "md" | "lg";
}

const Spinner: FC<Spinner> = ({ size = "md" }) => {
  const spinnerSize = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-18 w-18 border-8",
  }[size];

  return (
    <div
      className={`border-gray-300 animate-spin rounded-full border-t-transparent ${spinnerSize}`}
    />
  );
};

export default Spinner;
