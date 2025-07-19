import React from "react";

const WrongAnswerModal = ({ show, correctAnswer }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-3xl p-6 sm:p-8 text-center animate-pulse shadow-2xl max-w-sm border-4 border-white">
        <div className="text-4xl sm:text-6xl mb-4">🤔</div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Oops! Not quite right!
        </h2>
        <p className="text-base mb-2">
          The answer was:{" "}
          <span className="text-2xl font-bold">{correctAnswer}</span>
        </p>
        <p className="text-sm text-orange-100">
          Keep trying! You're getting better! 💪
        </p>
      </div>
    </div>
  );
};

export default WrongAnswerModal;
