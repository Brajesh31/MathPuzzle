import React from "react";
import { colors, puzzleAnimals } from "../../utils/constants";

const VisualElements = ({ num, colorIndex, operation }) => {
  if (num > 12 || operation === "×") {
    // For large numbers or multiplication, show decorative pattern
    return (
      <div className="flex flex-wrap justify-center max-w-32 sm:max-w-40">
        {Array.from({ length: Math.min(num, 8) }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${colors[colorIndex]} rounded-full m-0.5 animate-pulse`}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center max-w-32 sm:max-w-40">
      {Array.from({ length: num }, (_, i) => (
        <div
          key={i}
          className={`w-4 h-4 sm:w-6 sm:h-6 ${colors[colorIndex]} rounded-lg m-0.5 sm:m-1 flex items-center justify-center text-xs sm:text-sm shadow-md transform hover:scale-110 transition-transform`}
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <span
            className="animate-bounce"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            {puzzleAnimals[i % puzzleAnimals.length]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default VisualElements;
