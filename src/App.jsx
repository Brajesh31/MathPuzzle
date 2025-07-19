import React from "react";
import GameHeader from "./components/game/GameHeader";
import PuzzleDisplay from "./components/game/PuzzleDisplay";
import AnswerOptions from "./components/game/AnswerOptions";
import StatsPanel from "./components/game/StatsPanel";
import CelebrationModal from "./components/modals/CelebrationModal";
import WrongAnswerModal from "./components/modals/WrongAnswerModal";
import OperationChangeModal from "./components/modals/OperationChangeModal";
import useGameLogic from "./hooks/useGameLogic";
import usePuzzleGenerator from "./hooks/usePuzzleGenerator";
import "./App.css";
import "./index.css";
const App = () => {
  const gameLogic = useGameLogic();
  const puzzleGenerator = usePuzzleGenerator(
    gameLogic.currentOperation,
    gameLogic.level
  );

  const handleAnswer = (answer) => {
    gameLogic.handleAnswer(
      answer,
      puzzleGenerator.currentPuzzle.answer,
      puzzleGenerator.currentPuzzle.operation,
      puzzleGenerator.generatePuzzle
    );
  };

  const handleReset = () => {
    gameLogic.resetGame(puzzleGenerator.generatePuzzle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-2 sm:p-4 overflow-x-hidden">
      {/* Modals */}
      <OperationChangeModal
        show={gameLogic.showOperationChange}
        currentOperation={gameLogic.currentOperation}
      />
      <CelebrationModal
        show={gameLogic.showCelebration}
        streak={gameLogic.streak}
      />
      <WrongAnswerModal
        show={gameLogic.showWrongAnswer}
        correctAnswer={puzzleGenerator.currentPuzzle.answer}
      />

      {/* Game Header */}
      <GameHeader
        score={gameLogic.score}
        level={gameLogic.level}
        streak={gameLogic.streak}
        onReset={handleReset}
      />

      {/* Main Game Container */}
      <div className="max-w-4xl mx-auto">
        {/* Puzzle Display */}
        <PuzzleDisplay
          puzzle={puzzleGenerator.currentPuzzle}
          currentOperation={gameLogic.currentOperation}
        />

        {/* Answer Options */}
        <AnswerOptions
          options={puzzleGenerator.generateOptions()}
          selectedAnswer={gameLogic.selectedAnswer}
          correctAnswer={puzzleGenerator.currentPuzzle.answer}
          onAnswer={handleAnswer}
        />

        {/* Stats Panel */}
        <StatsPanel
          correctAnswers={gameLogic.correctAnswers}
          wrongAttempts={gameLogic.wrongAttempts}
          attempts={gameLogic.attempts}
          bestStreak={gameLogic.bestStreak}
        />
      </div>
    </div>
  );
};

export default App;
