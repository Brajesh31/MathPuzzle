import React from "react";
import { Award } from "lucide-react";
import { celebrations, encouragements } from "../../utils/constants";

const CelebrationModal = ({ show, streak }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-3xl p-6 sm:p-8 text-center animate-bounce shadow-2xl max-w-sm border-4 border-white">
        <div className="text-4xl sm:text-6xl mb-4">
          {celebrations[Math.floor(Math.random() * celebrations.length)]}
        </div>
        <h2 className="text-xl sm:text-3xl font-bold mb-2">
          {encouragements[Math.floor(Math.random() * encouragements.length)]}
        </h2>
        <p className="text-base sm:text-xl">
          {streak > 1 ? `${streak} in a row! 🔥` : "Correct Answer!"}
        </p>
        {streak >= 5 && (
          <div className="mt-2 text-yellow-200 animate-pulse">
            <Award className="w-6 h-6 mx-auto mb-1" />
            Super Streak!
          </div>
        )}
      </div>
    </div>
  );
};

export default CelebrationModal;
