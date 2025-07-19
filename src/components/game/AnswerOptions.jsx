import React from "react";

const AnswerOptions = ({
  options,
  selectedAnswer,
  correctAnswer,
  onAnswer,
}) => {
  const optionColors = [
    "from-emerald-400 to-teal-500",
    "from-blue-400 to-indigo-500",
    "from-purple-400 to-pink-500",
    "from-orange-400 to-red-500",
  ];

  const optionEmojis = ["🌟", "🎈", "🎊", "🎁"];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
      {options.map((option, index) => (
        <button
          key={option}
          onClick={() => onAnswer(option)}
          disabled={selectedAnswer !== null}
          className={`
            relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-2xl sm:text-4xl font-bold shadow-2xl transform transition-all hover:scale-105 min-h-20 sm:min-h-24 overflow-hidden
            ${
              selectedAnswer === option
                ? option === correctAnswer
                  ? "bg-gradient-to-br from-green-400 to-green-600 text-white animate-pulse scale-110"
                  : "bg-gradient-to-br from-red-400 to-red-600 text-white animate-shake"
                : `bg-gradient-to-br ${optionColors[index]} text-white hover:shadow-2xl hover:brightness-110`
            }
            ${
              selectedAnswer !== null
                ? "cursor-not-allowed"
                : "cursor-pointer hover:rotate-1"
            }
          `}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1 right-1 text-xl animate-spin-slow">
              ✨
            </div>
            <div className="absolute bottom-1 left-1 text-xl animate-bounce">
              ⭐
            </div>
          </div>

          <div className="relative z-10">
            <div className="mb-1">{option}</div>
            <div className="text-lg sm:text-2xl">{optionEmojis[index]}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
