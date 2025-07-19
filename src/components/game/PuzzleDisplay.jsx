import React from "react";

// Mock VisualElements component for demonstration
const VisualElements = ({ num, colorIndex, operation }) => {
  const colors = ["bg-blue-200", "bg-red-200", "bg-green-200"];
  const items = Array.from({ length: Math.min(num, 10) }, (_, i) => (
    <div
      key={i}
      className={`w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 rounded-full ${
        colors[colorIndex % colors.length]
      } m-0.5`}
    ></div>
  ));

  return (
    <div className="flex flex-wrap justify-center max-w-full">
      {items}
      {num > 10 && (
        <span className="text-xs text-gray-500 ml-1">+{num - 10}</span>
      )}
    </div>
  );
};

// Mock constants for demonstration
const operationNames = {
  "+": "Addition",
  "-": "Subtraction",
  "×": "Multiplication",
};

const operationEmojis = {
  "+": "➕",
  "-": "➖",
  "×": "✖️",
};

const PuzzleDisplay = ({
  puzzle = { num1: 8, num2: 5, operation: "+" },
  currentOperation = "+",
}) => {
  const getOperationSymbol = () => {
    switch (puzzle.operation) {
      case "+":
        return "+";
      case "-":
        return "−";
      case "×":
        return "×";
      default:
        return "+";
    }
  };

  const getOperationColor = () => {
    switch (puzzle.operation) {
      case "+":
        return "text-green-500";
      case "-":
        return "text-orange-500";
      case "×":
        return "text-purple-500";
      default:
        return "text-green-500";
    }
  };

  const getOperationEmoji = () => {
    switch (puzzle.operation) {
      case "+":
        return "➕";
      case "-":
        return "➖";
      case "×":
        return "✖️";
      default:
        return "➕";
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] shadow-2xl p-3 xs:p-4 sm:p-6 lg:p-8 mb-3 xs:mb-4 sm:mb-6 border-2 sm:border-4 border-white/50 relative overflow-hidden mx-2 xs:mx-0">
      {/* Background decoration - hidden on very small screens */}
      <div className="absolute inset-0 opacity-5 hidden xs:block">
        <div className="absolute top-2 xs:top-4 left-2 xs:left-4 text-3xl xs:text-4xl sm:text-6xl animate-spin-slow">
          ⭐
        </div>
        <div className="absolute top-2 xs:top-4 right-2 xs:right-4 text-3xl xs:text-4xl sm:text-6xl animate-bounce">
          🌟
        </div>
        <div className="absolute bottom-2 xs:bottom-4 left-2 xs:left-4 text-3xl xs:text-4xl sm:text-6xl animate-pulse">
          💫
        </div>
        <div className="absolute bottom-2 xs:bottom-4 right-2 xs:right-4 text-3xl xs:text-4xl sm:text-6xl animate-spin-slow">
          ✨
        </div>
      </div>

      <div className="relative z-10">
        {/* Operation Header */}
        <div className="text-center mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
          <div
            className={`inline-flex items-center ${getOperationColor()} bg-white rounded-xl xs:rounded-2xl px-3 xs:px-4 sm:px-6 py-2 xs:py-3 shadow-lg border-2 border-current/20 min-w-[200px] xs:min-w-[250px]`}
          >
            <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl mr-2 xs:mr-3 flex-shrink-0">
              {getOperationEmoji()}
            </span>
            <h2 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold">
              {operationNames[currentOperation]} Challenge
            </h2>
          </div>
        </div>

        {/* Math Problem Display */}
        <div className="flex flex-col items-center justify-center space-y-4 xs:space-y-5 sm:space-y-6 lg:space-y-8">
          {/* Numbers Row */}
          <div className="flex items-center justify-center space-x-1 xs:space-x-2 sm:space-x-4 lg:space-x-8 w-full px-1 xs:px-0">
            {/* First Number */}
            <div className="text-center flex-1 max-w-[55px] xs:max-w-[70px] sm:max-w-32 lg:max-w-40">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg xs:text-2xl sm:text-3xl lg:text-5xl font-bold p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl shadow-xl mb-2 xs:mb-3 transform hover:scale-105 transition-transform min-h-[40px] xs:min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
                {puzzle.num1}
              </div>
              <div className="hidden xs:block">
                <VisualElements
                  num={puzzle.num1}
                  colorIndex={0}
                  operation={puzzle.operation}
                />
              </div>
            </div>

            {/* Operation Sign */}
            <div
              className={`text-2xl xs:text-3xl sm:text-4xl lg:text-7xl font-bold ${getOperationColor()} bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-3 lg:p-4 shadow-xl animate-pulse flex-shrink-0 min-w-[35px] xs:min-w-[45px] sm:min-w-[60px] min-h-[35px] xs:min-h-[45px] sm:min-h-[60px] flex items-center justify-center`}
            >
              {getOperationSymbol()}
            </div>

            {/* Second Number */}
            <div className="text-center flex-1 max-w-[55px] xs:max-w-[70px] sm:max-w-32 lg:max-w-40">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white text-lg xs:text-2xl sm:text-3xl lg:text-5xl font-bold p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl shadow-xl mb-2 xs:mb-3 transform hover:scale-105 transition-transform min-h-[40px] xs:min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
                {puzzle.num2}
              </div>
              <div className="hidden xs:block">
                <VisualElements
                  num={puzzle.num2}
                  colorIndex={1}
                  operation={puzzle.operation}
                />
              </div>
            </div>

            {/* Equals Sign */}
            <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-7xl font-bold text-green-500 bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-3 lg:p-4 shadow-xl flex-shrink-0 min-w-[35px] xs:min-w-[45px] sm:min-w-[60px] min-h-[35px] xs:min-h-[45px] sm:min-h-[60px] flex items-center justify-center">
              =
            </div>

            {/* Question Mark */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xl xs:text-2xl sm:text-4xl lg:text-7xl p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl shadow-xl animate-bounce flex-shrink-0 min-w-[40px] xs:min-w-[50px] sm:min-w-[60px] min-h-[40px] xs:min-h-[50px] sm:min-h-[60px] flex items-center justify-center">
              ❓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleDisplay;
