import { useState, useEffect } from "react";
import { operations } from "../utils/constants";

const usePuzzleGenerator = (currentOperation, level) => {
  const [currentPuzzle, setCurrentPuzzle] = useState({
    num1: 0,
    num2: 0,
    answer: 0,
    operation: "+",
  });

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

  // Auto-generate first puzzle on component mount
  useEffect(() => {
    generatePuzzle();
  }, []);

  return {
    currentPuzzle,
    generatePuzzle,
    generateOptions,
  };
};

export default usePuzzleGenerator;
