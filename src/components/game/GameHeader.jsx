import React from "react";
import { Star, Trophy, Zap, RotateCcw } from "lucide-react";

const GameHeader = ({ score, level, streak, onReset }) => {
  return (
    <div className="flex justify-between items-center mb-4 sm:mb-6 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/20">
      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-base">
        <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span className="font-bold">{score}</span>
        </div>
        <div className="flex items-center text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          <span className="font-bold">L{level}</span>
        </div>
        {streak > 0 && (
          <div className="flex items-center text-orange-500 bg-orange-50 px-2 py-1 rounded-full animate-pulse">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            <span className="font-bold">{streak}</span>
          </div>
        )}
      </div>
      <button
        onClick={onReset}
        className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-2 sm:p-2.5 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-110 shadow-lg"
      >
        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default GameHeader;
