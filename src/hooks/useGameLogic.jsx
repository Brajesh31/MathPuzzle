import { useState } from "react";

const useGameLogic = () => {
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
  const [currentOperation, setCurrentOperation] = useState(0);
  const [showOperationChange, setShowOperationChange] = useState(false);

  const handleAnswer = (answer, correctAnswer, operation, generatePuzzle) => {
    setSelectedAnswer(answer);
    setAttempts((prev) => prev + 1);

    if (answer === correctAnswer) {
      const basePoints = operation === "×" ? 20 : operation === "-" ? 15 : 10;
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
        setSelectedAnswer(null); // Reset selectedAnswer here

        // Level up every 8 correct answers
        if (correctAnswers > 0 && (correctAnswers + 1) % 8 === 0) {
          setLevel((prev) => prev + 1);
        }

        // Change operation every 6 questions or when leveling up
        if (correctAnswers > 0 && (correctAnswers + 1) % 6 === 0) {
          setCurrentOperation((prev) => (prev + 1) % 3);
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
        setSelectedAnswer(null); // Reset selectedAnswer here too
        generatePuzzle();
      }, 2500);
    }
  };

  const resetGame = (generatePuzzle) => {
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

  return {
    selectedAnswer,
    score,
    showCelebration,
    showWrongAnswer,
    attempts,
    correctAnswers,
    wrongAttempts,
    level,
    streak,
    bestStreak,
    currentOperation,
    showOperationChange,
    handleAnswer,
    resetGame,
  };
};

export default useGameLogic;
