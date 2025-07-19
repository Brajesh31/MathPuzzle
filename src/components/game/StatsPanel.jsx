import React from "react";

const StatsPanel = ({
  correctAnswers,
  wrongAttempts,
  attempts,
  bestStreak,
}) => {
  return (
    <div className="bg-gradient-to-r from-white to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-purple-100">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
        <div className="bg-green-100 rounded-xl p-3 border-2 border-green-200">
          <div className="text-2xl sm:text-3xl font-bold text-green-600">
            {correctAnswers}
          </div>
          <div className="text-xs sm:text-sm text-green-700 font-medium">
            ✅ Correct
          </div>
        </div>

        <div className="bg-red-100 rounded-xl p-3 border-2 border-red-200">
          <div className="text-2xl sm:text-3xl font-bold text-red-600">
            {wrongAttempts}
          </div>
          <div className="text-xs sm:text-sm text-red-700 font-medium">
            ❌ Wrong
          </div>
        </div>

        <div className="bg-blue-100 rounded-xl p-3 border-2 border-blue-200">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
            {attempts}
          </div>
          <div className="text-xs sm:text-sm text-blue-700 font-medium">
            📊 Total
          </div>
        </div>

        <div className="bg-purple-100 rounded-xl p-3 border-2 border-purple-200">
          <div className="text-2xl sm:text-3xl font-bold text-purple-600">
            {attempts > 0 ? Math.round((correctAnswers / attempts) * 100) : 0}%
          </div>
          <div className="text-xs sm:text-sm text-purple-700 font-medium">
            🎯 Score
          </div>
        </div>
      </div>

      {bestStreak > 0 && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full border-2 border-orange-200">
            <span className="text-lg mr-2">🔥</span>
            <span className="font-bold">Best Streak: {bestStreak}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
