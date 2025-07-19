import React, { useState, useEffect } from "react";
import {
  Star,
  Heart,
  Smile,
  Trophy,
  RotateCcw,
  Clock,
  Target,
  Zap,
  Award,
} from "lucide-react";

const Test = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState({
    num1: 0,
    num2: 0,
    answer: 0,
    operation: "+",
  });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentOperation, setCurrentOperation] = useState(0); // Cycles through operations
  const [showOperationChange, setShowOperationChange] = useState(false);

  const operations = ["+", "-", "×"];
  const operationNames = ["Addition", "Subtraction", "Multiplication"];
  const operationEmojis = ["➕", "➖", "✖️"];

  const colors = [
    "bg-gradient-to-br from-red-400 to-red-500",
    "bg-gradient-to-br from-blue-400 to-blue-500",
    "bg-gradient-to-br from-green-400 to-green-500",
    "bg-gradient-to-br from-yellow-400 to-yellow-500",
    "bg-gradient-to-br from-purple-400 to-purple-500",
    "bg-gradient-to-br from-pink-400 to-pink-500",
  ];

  const puzzleAnimals = ["🦄", "🐉", "🦋", "🌟", "⭐", "💎", "🎨", "🌈"];
  const celebrations = ["🎉", "🌟", "🎊", "🏆", "✨", "🎈", "🚀", "💫"];
  const encouragements = [
    "Awesome!",
    "Brilliant!",
    "Perfect!",
    "Amazing!",
    "Fantastic!",
    "Excellent!",
    "Outstanding!",
    "Superb!",
  ];

  // Auto-generate first puzzle on component mount
  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    const operation = operations[currentOperation];
    let num1, num2, answer;
    const maxNum = Math.min(4 + level * 2, 15);

    if (operation === "+") {
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * maxNum) + 1;
      answer = num1 + num2;
    } else if (operation === "-") {
      num1 = Math.floor(Math.random() * maxNum) + Math.max(5, level + 3);
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = num1 - num2;
    } else if (operation === "×") {
      num1 = Math.floor(Math.random() * Math.min(level + 3, 12)) + 1;
      num2 = Math.floor(Math.random() * Math.min(level + 3, 12)) + 1;
      answer = num1 * num2;
    }

    setCurrentPuzzle({ num1, num2, answer, operation });
    setSelectedAnswer(null);
  };

  const generateOptions = () => {
    const correct = currentPuzzle.answer;
    const options = [correct];
    const range = currentPuzzle.operation === "×" ? 12 : 6;

    while (options.length < 4) {
      let wrong;
      if (currentPuzzle.operation === "×") {
        // More realistic wrong answers for multiplication
        const factor1 = Math.floor(Math.random() * 3) + 1;
        const factor2 = Math.floor(Math.random() * 3) + 1;
        wrong = correct + factor1 * factor2 - Math.floor(Math.random() * range);
      } else {
        wrong = correct + Math.floor(Math.random() * range * 2) - range;
      }

      if (
        wrong > 0 &&
        wrong !== correct &&
        !options.includes(wrong) &&
        wrong <= 200
      ) {
        options.push(wrong);
      }
    }

    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAttempts((prev) => prev + 1);

    if (answer === currentPuzzle.answer) {
      const basePoints =
        currentPuzzle.operation === "×"
          ? 20
          : currentPuzzle.operation === "-"
          ? 15
          : 10;
      const streakBonus = streak * 3;
      const levelBonus = level * 2;
      const totalPoints = basePoints + streakBonus + levelBonus;

      setScore((prev) => prev + totalPoints);
      setCorrectAnswers((prev) => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);

        // Level up every 8 correct answers
        if (correctAnswers > 0 && (correctAnswers + 1) % 8 === 0) {
          setLevel((prev) => prev + 1);
        }

        // Change operation every 6 questions or when leveling up
        if (correctAnswers > 0 && (correctAnswers + 1) % 6 === 0) {
          setCurrentOperation((prev) => (prev + 1) % operations.length);
          setShowOperationChange(true);
          setTimeout(() => setShowOperationChange(false), 2000);
        }

        generatePuzzle();
      }, 1800);
    } else {
      setWrongAttempts((prev) => prev + 1);
      setStreak(0);
      setShowWrongAnswer(true);

      setTimeout(() => {
        setShowWrongAnswer(false);
        generatePuzzle();
      }, 2500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setCorrectAnswers(0);
    setWrongAttempts(0);
    setLevel(1);
    setStreak(0);
    setCurrentOperation(0);
    setSelectedAnswer(null);
    setShowCelebration(false);
    setShowWrongAnswer(false);
    generatePuzzle();
  };

  const renderVisualElements = (num, colorIndex) => {
    if (num > 12 || currentPuzzle.operation === "×") {
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

  const getOperationSymbol = () => {
    switch (currentPuzzle.operation) {
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
    switch (currentPuzzle.operation) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-2 sm:p-4 overflow-x-hidden">
      {/* Floating Header */}
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
          onClick={resetGame}
          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-2 sm:p-2.5 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-110 shadow-lg"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Main Game Container */}
      <div className="max-w-4xl mx-auto">
        {/* Operation Change Notification */}
        {showOperationChange && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-center animate-bounce shadow-2xl max-w-sm border-4 border-purple-200">
              <div className="text-4xl sm:text-6xl mb-4">
                {operationEmojis[currentOperation]}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
                New Challenge!
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                {operationNames[currentOperation]} Time!
              </p>
            </div>
          </div>
        )}

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white rounded-3xl p-6 sm:p-8 text-center animate-bounce shadow-2xl max-w-sm border-4 border-white">
              <div className="text-4xl sm:text-6xl mb-4">
                {celebrations[Math.floor(Math.random() * celebrations.length)]}
              </div>
              <h2 className="text-xl sm:text-3xl font-bold mb-2">
                {
                  encouragements[
                    Math.floor(Math.random() * encouragements.length)
                  ]
                }
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
        )}

        {/* Wrong Answer Modal */}
        {showWrongAnswer && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-3xl p-6 sm:p-8 text-center animate-pulse shadow-2xl max-w-sm border-4 border-white">
              <div className="text-4xl sm:text-6xl mb-4">🤔</div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Oops! Not quite right!
              </h2>
              <p className="text-base mb-2">
                The answer was:{" "}
                <span className="text-2xl font-bold">
                  {currentPuzzle.answer}
                </span>
              </p>
              <p className="text-sm text-orange-100">
                Keep trying! You're getting better! 💪
              </p>
            </div>
          </div>
        )}

        {/* Puzzle Display - Main Attraction */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl sm:rounded-[2rem] shadow-2xl p-4 sm:p-8 mb-4 sm:mb-6 border-4 border-white/50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 text-6xl animate-spin-slow">
              ⭐
            </div>
            <div className="absolute top-4 right-4 text-6xl animate-bounce">
              🌟
            </div>
            <div className="absolute bottom-4 left-4 text-6xl animate-pulse">
              💫
            </div>
            <div className="absolute bottom-4 right-4 text-6xl animate-spin-slow">
              ✨
            </div>
          </div>

          <div className="relative z-10">
            {/* Operation Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div
                className={`inline-flex items-center ${getOperationColor()} bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-current/20`}
              >
                <span className="text-2xl sm:text-3xl mr-2">
                  {operationEmojis[currentOperation]}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold">
                  {operationNames[currentOperation]} Challenge
                </h2>
              </div>
            </div>

            {/* Math Problem Display */}
            <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
              {/* Numbers Row */}
              <div className="flex items-center justify-center space-x-4 sm:space-x-8 w-full">
                {/* First Number */}
                <div className="text-center flex-1 max-w-32 sm:max-w-40">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl sm:text-5xl font-bold p-4 rounded-2xl shadow-xl mb-3 transform hover:scale-105 transition-transform">
                    {currentPuzzle.num1}
                  </div>
                  {renderVisualElements(currentPuzzle.num1, 0)}
                </div>

                {/* Operation Sign */}
                <div
                  className={`text-4xl sm:text-7xl font-bold ${getOperationColor()} bg-white rounded-2xl p-3 sm:p-4 shadow-xl animate-pulse`}
                >
                  {getOperationSymbol()}
                </div>

                {/* Second Number */}
                <div className="text-center flex-1 max-w-32 sm:max-w-40">
                  <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white text-3xl sm:text-5xl font-bold p-4 rounded-2xl shadow-xl mb-3 transform hover:scale-105 transition-transform">
                    {currentPuzzle.num2}
                  </div>
                  {renderVisualElements(currentPuzzle.num2, 1)}
                </div>

                {/* Equals Sign */}
                <div className="text-4xl sm:text-7xl font-bold text-green-500 bg-white rounded-2xl p-3 sm:p-4 shadow-xl">
                  =
                </div>

                {/* Question Mark */}
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-4xl sm:text-7xl p-4 rounded-2xl shadow-xl animate-bounce">
                  ❓
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Options - Attractive Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          {generateOptions().map((option, index) => {
            const optionColors = [
              "from-emerald-400 to-teal-500",
              "from-blue-400 to-indigo-500",
              "from-purple-400 to-pink-500",
              "from-orange-400 to-red-500",
            ];
            const optionEmojis = ["🌟", "🎈", "🎊", "🎁"];

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`
                  relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-2xl sm:text-4xl font-bold shadow-2xl transform transition-all hover:scale-105 min-h-20 sm:min-h-24 overflow-hidden
                  ${
                    selectedAnswer === option
                      ? option === currentPuzzle.answer
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
                  <div className="text-lg sm:text-2xl">
                    {optionEmojis[index]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Enhanced Stats Panel */}
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
                {attempts > 0
                  ? Math.round((correctAnswers / attempts) * 100)
                  : 0}
                %
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
      </div>
    </div>
  );
};

export default Test;
