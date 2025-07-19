// components/ui/Loader.jsx
import React from "react";

const Loader = ({ size = "small" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-blue-300 border-t-blue-600 ${sizeClasses[size]}`}
    ></div>
  );
};

export default Loader;
